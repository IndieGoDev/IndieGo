@echo on
java -jar Closure.jar --js_output_file=%~n1.min.js %~n1.js
PAUSE
EXIT
