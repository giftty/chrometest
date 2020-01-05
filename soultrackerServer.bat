@ECHO OFF
 
:WHILE
    SET /P uname=Please enter Username to use : 
    SET /P pas=Please enter password :

 IF "%uname%"==" " GOTO WHILE
 IF "%pas%"==" " GOTO WHILE
ECHO {"username":"%uname%","password":"%pas%"}>passinfo.txt
SET /P datastart="Please enter where to start in excel data : " 
SET /P dataend="Please enter where to end : "
:DATA
IF "%datastart%"==" "  GOTO DATA
IF "%dataend%"==" " GOTO DATA

ECHO {"datastart":"%datastart%","dataend":"%dataend%"}>startinfo.txt

ECHO OK THANK YOU
start node test
PAUSE