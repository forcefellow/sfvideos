public with sharing class addMultipleContactsController {
   @AuraEnabled
   public static ResponseWrapper saveMultipleContacts(List<Contact>contacts){
        ResponseWrapper response=new ResponseWrapper();
        try {
            insert contacts;
            response.isSuccess=true;
        } catch (Exception e) {
            response.isSuccess=false;
            response.message=e.getMessage();
        }
        return response;
   }

   public class ResponseWrapper
   {
        @AuraEnabled
        public Boolean isSuccess{get;set;}
        @AuraEnabled
        public String message{get;set;}

   }
}