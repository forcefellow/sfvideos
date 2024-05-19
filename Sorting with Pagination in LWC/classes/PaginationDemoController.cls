public with sharing class PaginationDemoController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
       List<Contact> contacts = [SELECT Id,Name,Email,Phone,Department FROM Contact];
        return contacts;
    }

    @AuraEnabled
    public static List<Account> getAccounts(Integer pageSize,String lastRecordId,
    String sortColumnName, String sortOrder,String sortedLastFieldValue){
        Object convertedFieldValue= convertFilterValueIntoFieldType('Account',sortColumnName,sortedLastFieldValue);
        // SANITIZATION TO PREVENT SOQL INJECTION
        sortColumnName=String.isNotBlank(sortColumnName)?String.escapeSingleQuotes(sortColumnName):sortColumnName;
        String operator=sortOrder=='DESC'?'<':'>';
        String query='SELECT Id,Name,Type,Rating,NumberOfEmployees,CreatedDate FROM Account ';
        // EXECUTE WHEN SORT COLUMN NAME IS BLANK AND LAST RECORD ID IS NOT BLANK
        if(String.isNotBlank(lastRecordId) && String.isBlank(sortColumnName)){
            query+='WHERE Id '+operator+' :lastRecordId ';
        }
        // EXECUTE WHEN LAST RECORD VALUE IS NOT BLANK
        else if(String.isNotBlank(lastRecordId) && String.isNotBlank(sortColumnName) && String.isNotBlank(sortedLastFieldValue)){
            query+='WHERE ('+sortColumnName+' = :convertedFieldValue AND Id '+operator+' :lastRecordId) OR '+sortColumnName+' '+operator+' :convertedFieldValue ';
        }
        // EXECUTE WHEN LAST RECORD VALUE IS BLANK
        else if(String.isNotBlank(lastRecordId) && String.isNotBlank(sortColumnName) && String.isBlank(sortedLastFieldValue)){
            if(sortOrder=='ASC'){
                query+='WHERE ((Id '+operator+' :lastRecordId AND '+sortColumnName+'= \'\') OR ('+sortColumnName+'<> \'\')) ';
            }
            else{
                query+='WHERE (Id '+operator+' :lastRecordId AND '+sortColumnName+'= \'\') ';
            }
        }
        query+='ORDER BY ';
        if(String.isNotBlank(sortColumnName)){
            query+=sortColumnName+' '+ (sortOrder??'ASC') +', ';
        }
        query+='Id '+ (sortOrder??'ASC') +' LIMIT :pageSize';
        System.debug('Final Query - '+ query);
        return Database.query(query);
    }

    private static Object convertFilterValueIntoFieldType(String objectName, String fieldName,String fieldValue){
        Object newFieldValue=fieldValue;
        if(String.isBlank(fieldName) || String.isBlank(fieldValue)){
            return newFieldValue;
        }

        String fieldDataType = String.valueOf(Schema.getGlobalDescribe().get(objectName).getDescribe()
            .fields.getMap().get(fieldName).getDescribe().getType());

        switch on fieldDataType {
            when 'INTEGER'{
                newFieldValue=Integer.valueOf(fieldValue);
            }
            when 'DATETIME' {
                newFieldValue=DateTime.valueOfGMT(fieldValue.replace('T', ' '));
            }
            when 'BOOLEAN'{
                newFieldValue=Boolean.valueOf(fieldValue);
            }	
            // ADD MORE TYPES AS REQUIRED.
        }
        return newFieldValue;
    }

    @AuraEnabled(cacheable=true)
    public static Integer getTotalAccountsCount(){
        return [SELECT COUNT() FROM Account];
    }
}