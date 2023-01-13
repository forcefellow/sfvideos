public with sharing class LWCAccountsController {
   @AuraEnabled(cacheable=true)
   public static List<Account> getAccounts(String searchText){
    try {
        
        if(String.IsEmpty(searchText)){
            return [SELECT Id,Name FROM  Account];
        }
        else {
            searchText='%'+searchText+'%';
            return [SELECT Id,Name FROM  Account WHERE Name LIKE :searchText];
        }
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }

   @AuraEnabled
   public static List<Contact> getAccountContacts(String accountId){
    try {
        return [SELECT Id,Name FROM Contact WHERE accountId=:accountId];
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
}
