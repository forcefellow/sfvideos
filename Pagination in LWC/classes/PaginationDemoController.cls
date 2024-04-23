public with sharing class PaginationDemoController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
       List<Contact> contacts = [SELECT Id,Name,Email,Phone,Department FROM Contact];
        return contacts;
    }

    @AuraEnabled
    public static List<Account> getAccounts(Integer pageSize,String lastRecordId){
        String query='SELECT Id,Name,Type,Rating FROM Account ';
        if(String.isNotBlank(lastRecordId)){
            query+='WHERE Id >:lastRecordId ';
        }
        query+='ORDER BY Id LIMIT :pageSize';
        return Database.query(query);
    }

    @AuraEnabled(cacheable=true)
    public static Integer getTotalAccountsCount(){
        return [SELECT COUNT() FROM Account];
    }
}