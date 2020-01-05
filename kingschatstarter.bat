@ECHO OFF
 

SET /P datastart="Please enter where to start in excel data : " 
SET /P dataend="Please enter where to end : "
:DATA

IF "%datastart%"==" "  GOTO DATA
IF "%dataend%"== " " GOTO DATA

ECHO {"datastart":"%datastart%","dataend":"%dataend%"}>startkingschat.txt

ECHO OK THANK YOU
start node kingsfollowauto
PAUSE