# Proyecto-de-Preguntas-y-respuestas-Angulat-y-.NET-Core-
![image](https://user-images.githubusercontent.com/67492035/218608133-3613014a-e28a-44e4-880c-7aec0301c2a0.png)
Este es pequeño proyecto personal de un cuestionario donde podrás resolver cuestionarios hechos por otros usuarios, y para crear un cuestionario debes crearte una cuenta y loguearte, y podras tambien administrar todos tus cuestionarios y ver quienes respondieron tu cuestionario.

Para poder ejecutar el proyecto es necesario realizar lo siguiente:
1. Debes crear una base de datos local en microsoft sql server llamado TestDB o configurar otra base de datos y cambiarlo en el archivo appsettings.Development.json que se encuentra en Backend API
2. Luego de tener listo la base de datos debes ir a la consola de Administrador de paquetes NuGet y seleccionar en proyecto determinado la carpeta de DataAccess ya que ahi se encuentra las migraciones que realize
3. Despues pasar estas migraciones a la base de datos con el comando update-database en esa consola, y luego ejecutar el proyecto
4. Como último entrar aqui donde ya se encuentra deployado el fronted de mi proyecto: https://questimake.netlify.app/ 
