---
title: "Feed"
metaTitle: "Feed"
metaDescription: "Feed de datos necesario para poder trabajar sobre entidades"
---

# ¿Por qué necesitamos un feed de productos?
Para poder actualizar regularmente los detalles de cada producto en su tienda online, necesitamos acceso a un feed de productos actualizado. Normalmente, nosotros recomendamos actualizar dicho feed de productos una vez al día pero, desde nuestro [asistente](https://analytics.brainsins.com/), usted puede configurar la frecuencia con la que desea que se actualice su catálogo. 

Si usas uno de nuestros módulos de Prestashop o Magento, no necesitarás crear un feed de productos, ya que nuestro módulo lo generará por usted. Sin embargo, sí que es necesario subirlo a nuestra herramienta de administración.

En el caso de que no uses ningún módulo de BrainSINS, aceptamos tres diferentes formatos de feed de productos: BrainSINS XML, Google Shopping XML o Google Shopping CSV. 

# Google Shopping CSV
Si manejas tus productos con Google Shopping, puedes generar un feed de productos de Google Shopping en formato XML o CVS. Si prefieres el formato CSV, podemos procesar el archivo para recuperar toda la información sobre tus productos.

**Aviso Importante:** *Los productos en el feed solo debe incluir números, cualquier otro caracter no será válido. Si no fuera posible, por favor pongase en contacto con nuestro equipo de soporte en support@brainsins.zendesk.com*

Deberías poder acceder a la conversión de tu feed directamente desde la siguiente URL:
```
http://catalog.brainsins.com/convert.php?format=google_shopping_csv&url=https://www.feedgoogledemitienda.com
```

**NOTA:** *la parte "https://www.feedgoogledemitienda.com" debe ser una URL pública con el feed de productos de tu tienda online. Puede tardar varios minutos en cargarse.*

Si nuestro conversor es capaz de generar correctamente el feed de productos de tu tienda debes acceder a nuestra [herramienta de administración](https://analytics.brainsins.com/) y esta URL de manera que nosotros podamos recargar automáticamente los productos.

# Google Shopping XML
Si manejas tus productos con Google Shopping, puedes generar un feed de productos de Google Shopping en formato XML o CVS. Si prefieres el formato XML, podemos procesar el archivo para recuperar toda la información sobre tus productos.

**Aviso Importante:** *Los productos en el feed solo debe incluir números, cualquier otro caracter no será válido. Si esto no fuera posible, por favor pongase en contacto con nuestro equipo de soporte en support@brainsins.zendesk.com*

Deberías poder acceder a la conversión de tu feed directamente desde la siguiente URL:
```
http://catalog.brainsins.com/convert.php?format=google_shopping_xml&url=https://www.feedgoogledemitienda.com
```
**NOTA:** *la parte "https://www.feedgoogledemitienda.com" debe ser una URL pública con el feed de productos de tu tienda online. Puede tardar varios minutos en cargarse.*

Si nuestro conversor es capaz de generar correctamente el feed de productos de tu tienda debes acceder a nuestra [herramienta de administración](https://analytics.brainsins.com/) y esta URL de manera que nosotros podamos recargar automáticamente los productos.

# Magento
Si nuestra extensión ha sido capaz de generar el feed de productos de su tienda online, podrá acceder a este feed en tiempo real usando la siguiente URL: 
```
http://catalog.brainsins.com/magento-loader.php?url=http://www.mitienda.com.
```

**NOTA:** *la parte de “http://www.mitienda.com” es la url de su tienda. Tenga en cuenta que esta operación puede durar varios minutos.*

En caso de que su versión de Magento sea la 1.9 habría que usar el siguiente conversor en vez del anterior: 
```
http://catalog.brainsins.com/magento8/catalog.php?url=http://www.mitienda.com
```

Después de comprobar que el módulo ha generado el feed de productos de nuestra tienda, debes acceder al [administrador de analytics](https://analytics.brainsins.com/) y cargar la url del feed. De esta forma podremos cargar el feed automáticamente.

# Prestashop
Si nuestra extensión ha sido capaz de generar el feed de productos de su tienda online, podrá acceder a este feed en tiempo real usando la siguiente URL: 
```
http://catalog.brainsins.com/prestashop-loader.php?url=http://www.mitienda.com.
```

**NOTA:** *la parte de “http://www.mitienda.com” es la url de su tienda. Tenga en cuenta que esta operación puede durar varios minutos.*

Después de comprobar que el módulo ha generado el feed de productos de nuestra tienda, debes acceder al [administrador de analytics](https://analytics.brainsins.com/) y cargar la url del feed. De esta forma podremos cargar el feed automáticamente.

# Formato BrainSINS
Si prefieres crear un XML con nuestro formato propio, debes generar un archivo con extensión XML que contenga la información de los diferentes productos dentro de tu web, incluyendo nombre, precio, descripción, URL... Puedes usar el siguiente ejemplo como plantilla para crear tu propio XML:

**Importante:** *Los id de producto solo pueden incluir números. Cualquier otro caracter no será valido.*

**Importante:** *idProduct, url, price y imageUrl no pueden ir en blanco.*

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
   <recsins version="0.1">
      <entities>
         <entity name="product">
            <property name="idProduct"> ID del producto </property>
            <multi_property name="name">
            <property lang="en"> name in that language </property>
            <property lang="de"> name in that language </property>
            <property lang="es"> name in that language </property>
            ...
            </multi_property>
            <multi_property name="url">
            <property lang="en"> url in that language </property>
            <property lang="de"> url in that language </property>
            <property lang="es"> url in that language </property>
            ...
            </multi_property>
            <property name="price"> price </property>
            <property name="imageUrl"> image URL </property>
            <property name="categories"> Categorías </property>
            ...      
         </entity>
         ...
    </entities>
</recsins>
```
¿Qué debe contener cada property?
- **idProduct**: número natural (ningún otro caracter, solo números).
- **name**: string sin caracteres extraños aunque se puede pasar como un CDATA.
- **url**: string con una url válida.
- **price**: número decimal separando la parte decimal con ".". 
- **imageUrl**: string con url válida.
- **categories**: categorías separadas por comas.   

Estos son las properties imprescindibles para nuestro formato de catálogo pero también se pueden poner otras opcionales: 
- **description:** debe contener un string y puede ser multi_property.
- **stock:** debe contener un numero natural que nos da información para posibles reglas de negocio.
- **active:** puede ser 1 para permitir que el producto aparezca en los recomendadores o **0** para que no se muestre. Si el feed de productos no contiene esta property, será por defecto **1**.

Se puede incluir una multi_property llamada "**multiprice**" con los deferentes precios por lenguaje. En este caso la property "price" sigue siendo necesaría.

Todas estas son propertys que nuestro loader reconoce como nativas. Esto implica que podrás utilizar esos datos como variables en desde nuestro editor de estilos del recomendador. Si necesitas otra property para el recomendador como "descuento", "precio_rebajado", "tag", etc. debes usar una property especial llamada "**misc**". Puedes verlo en el siguiente ejemplo:
```xml
<property name="misc">
   {"offer_price":"22.95","brand":"brainSINS","discount": "15"}
</property>
```
Estos campos podremos usarlos como variables en el editor de estilos del recomendador de la siguiente manera: {misc.offer_price}, ${misc.brand} y ${misc.discount}.

# Subida por FTP
A continuación se explican los pasos necesarios para poder subir de manera programática un fichero a nuestros sistemas para su posterior uso como feed de items/productos.

## 1. Solicitar endpoint de subida, y firma necesaria
Se realizará una petición GET al endpoint https://cloud.brainsins.com/operations/uploadfeed con los parámetros siguientes (todos dados por el equipo de Soporte de BrainSINS):
- token [String]: identificador del cliente
- password [String]: clave asociada al ID de cliente para autorizar la petición

La respuesta contendrá un JSON que contiene:
- url [String]: Endpoint al que habrá que realizar la llamada POST a posteriori
- fields [JSON]: dentro de fields se encuentran todos los campos que deberán reenviarse en la llamada POST a posteriori

Ejemplo de URL:
```
https://cloud.brainsins.com/operations/uploadfeed?token=BS-0123456789-1&password=abcdefg
```
Ejemplo de repsuesta:
```json
{
    "url": "https://brainsinsclients.s3.amazonaws.com/",
    "fields": {
        "key": "BS-0123456789-1/clientuploads/upload.xml",
        "AWSAccessKeyId": "ASIATOPOE4TCLXZ6NIPN",
        "x-amz-security-token": "FQoGZXIvYXdzEKL//////////wEaDABk3TwX265ep5vlVCLpATvNvQGd1MsRehRZblNo2PimbLwlA84rmgxzzlxc5dB92YxAmSAler/Lx/QHIIfkQCBW3yyPjBvvCs85jadD8d53raHwCY3GxbiMS0Dhrua375ZWOHcfiYNK01poEVfKn4CR6aa1KB1cDg09drLH4QB+AalKlmMlZ2fz+SiGut1HlJDgJkSN/7jcJoMp6N5/F7yzv5F54A3UbQK67xgFdZzliTDXZWTR3QFs6ZGJjo2h1jKJjfNVy3voXJbP2f8If/7uag5029CtzZuzoos/BgPZSAoOZVGX0NoKA1iSiFlMUqhT0n8IyvFmKPvO5d4F",
        "policy": "eyJleHBpcmF0aW9uIjogIjIwMTgtMTAtMzFUMDk6NDQ6NDRaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAiYnJhaW5zaW5zY2xpZW50cyJ9LCB7ImtleSI6ICJCUy05MDgyNzEyMjE5LTEvY2xpZW50dXBsb2Fkcy91cGxvYWQueG1sIn0sIHsieC1hbXotc2VjdXJpdHktdG9rZW4iOiAiRlFvR1pYSXZZWGR6RUtMLy8vLy8vLy8vL3dFYURBQmszVHdYMjY1ZXA1dmxWQ0xwQVR2TnZRR2QxTXNSZWhSWmJsTm8yUGltYkx3bEE4NHJtZ3h6emx4YzVkQjkyWXhBbVNBbGVyL0x4L1FISUlma1FDQlczeXlQakJ2dkNzODVqYWREOGQ1M3JhSHdDWTNHeGJpTVMwRGhydWEzNzVaV09IY2ZpWU5LMDFwb0VWZktuNENSNmFhMUtCMWNEZzA5ZHJMSDRRQitBYWxLbG1NbFoyZnorU2lHdXQxSGxKRGdKa1NOLzdqY0pvTXA2TjUvRjd5enY1RjU0QTNVYlFLNjd4Z0ZkWnpsaVREWFpXVFIzUUZzNlpHSmpvMmgxaktKamZOVnkzdm9YSmJQMmY4SWYvN3VhZzUwMjlDdHpadXpvb3MvQmdQWlNBb09aVkdYME5vS0ExaVNpRmxNVXFoVDBuOEl5dkZtS1B2TzVkNEYifV19",
        "signature": "JMaL9FOc6Dhs2uozlX2csHrfHUU="
    }
}
```
Ejemplo de código en PHP:
```php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://cloud.brainsins.com/operations/uploadfeed?token=BS-0123456789-1&password=abcdefg",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```
Ejemplo de código en JAVA:
```java
OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://cloud.brainsins.com/operations/uploadfeed?token=BS-0123456789-1&password=abcdefg")
  .get()
  .addHeader("cache-control", "no-cache")
  .build();

Response response = client.newCall(request).execute();
```
Ejemplo de código en CURL:
```bash
curl -X GET \
  'https://cloud.brainsins.com/operations/uploadfeed?token=BS-0123456789-1&password=Oj7v6r4hXZ' \
  -H 'cache-control: no-cache'
```
## 2. Usar la respuesta anterior para enviar fichero
A raíz de la respuesta de la petición anterior, debemos realizar una petición **POST** al **endpoint** indicado en el atributo url de la respuesta JSON anterior. Los atributos y valores dentro de **fields** deben ir como campos de la petición **POST**, añadiéndole el campo **file**, el cual será el fichero a subir. Resumiendo los campos que deben ir en la llamada:
- key
- AWSAccessKeyId
- x-amz-security-token
- policy
- signature
- file

La respuesta en caso de subida satisfactoria es un **204**, respuesta **vacía**.

Especial atención al **path** del fichero a subir.

Ejemplo de código PHP:
```PHP
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://brainsinsclients.s3.amazonaws.com",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => array(
    "key"=>"BS-0123456789-1/clientuploads/upload.xml",
    "AWSAccessKeyId"=>"ASIATOPOE4TCLXZ6NIPN",
    "x-amz-security-token"=>"FQoGZXIvYXdzEKL//////////wEaDABk3TwX265ep5vlVCLpATvNvQGd1MsRehRZblNo2PimbLwlA84rmgxzzlxc5dB92YxAmSAler/Lx/QHIIfkQCBW3yyPjBvvCs85jadD8d53raHwCY3GxbiMS0Dhrua375ZWOHcfiYNK01poEVfKn4CR6aa1KB1cDg09drLH4QB+AalKlmMlZ2fz+SiGut1HlJDgJkSN/7jcJoMp6N5/F7yzv5F54A3UbQK67xgFdZzliTDXZWTR3QFs6ZGJjo2h1jKJjfNVy3voXJbP2f8If/7uag5029CtzZuzoos/BgPZSAoOZVGX0NoKA1iSiFlMUqhT0n8IyvFmKPvO5d4F",
    "policy"=>"eyJleHBpcmF0aW9uIjogIjIwMTgtMTAtMzFUMTA6MTI6NDBaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAiYnJhaW5zaW5zY2xpZW50cyJ9LCB7ImtleSI6ICJCUy05MDgyNzEyMjE5LTEvY2xpZW50dXBsb2Fkcy91cGxvYWQueG1sIn0sIHsieC1hbXotc2VjdXJpdHktdG9rZW4iOiAiRlFvR1pYSXZZWGR6RUtMLy8vLy8vLy8vL3dFYURBQmszVHdYMjY1ZXA1dmxWQ0xwQVR2TnZRR2QxTXNSZWhSWmJsTm8yUGltYkx3bEE4NHJtZ3h6emx4YzVkQjkyWXhBbVNBbGVyL0x4L1FISUlma1FDQlczeXlQakJ2dkNzODVqYWREOGQ1M3JhSHdDWTNHeGJpTVMwRGhydWEzNzVaV09IY2ZpWU5LMDFwb0VWZktuNENSNmFhMUtCMWNEZzA5ZHJMSDRRQitBYWxLbG1NbFoyZnorU2lHdXQxSGxKRGdKa1NOLzdqY0pvTXA2TjUvRjd5enY1RjU0QTNVYlFLNjd4Z0ZkWnpsaVREWFpXVFIzUUZzNlpHSmpvMmgxaktKamZOVnkzdm9YSmJQMmY4SWYvN3VhZzUwMjlDdHpadXpvb3MvQmdQWlNBb09aVkdYME5vS0ExaVNpRmxNVXFoVDBuOEl5dkZtS1B2TzVkNEYifV19",
    "signature"=>"AIp6gb271FtiEW6icLHfZHYqTAs=",
    "file"=>file_get_contents("/path/to/file.txt")
  ),
  CURLOPT_HTTPHEADER => array(
    "Postman-Token: d4b5d893-3249-46dc-a074-cd791aa9515e",
    "cache-control: no-cache",
    "content-type: multipart/form-data;"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```
Ejemplo de código JAVA:
```java
OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW");
RequestBody body = RequestBody.create(mediaType, "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"key\"\r\n\r\nBS-0123456789-1/clientuploads/upload.xml\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"AWSAccessKeyId\"\r\n\r\nASIATOPOE4TCLXZ6NIPN\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"x-amz-security-token\"\r\n\r\nFQoGZXIvYXdzEKL//////////wEaDABk3TwX265ep5vlVCLpATvNvQGd1MsRehRZblNo2PimbLwlA84rmgxzzlxc5dB92YxAmSAler/Lx/QHIIfkQCBW3yyPjBvvCs85jadD8d53raHwCY3GxbiMS0Dhrua375ZWOHcfiYNK01poEVfKn4CR6aa1KB1cDg09drLH4QB+AalKlmMlZ2fz+SiGut1HlJDgJkSN/7jcJoMp6N5/F7yzv5F54A3UbQK67xgFdZzliTDXZWTR3QFs6ZGJjo2h1jKJjfNVy3voXJbP2f8If/7uag5029CtzZuzoos/BgPZSAoOZVGX0NoKA1iSiFlMUqhT0n8IyvFmKPvO5d4F\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"policy\"\r\n\r\neyJleHBpcmF0aW9uIjogIjIwMTgtMTAtMzFUMDk6NDQ6NDRaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAiYnJhaW5zaW5zY2xpZW50cyJ9LCB7ImtleSI6ICJCUy05MDgyNzEyMjE5LTEvY2xpZW50dXBsb2Fkcy91cGxvYWQueG1sIn0sIHsieC1hbXotc2VjdXJpdHktdG9rZW4iOiAiRlFvR1pYSXZZWGR6RUtMLy8vLy8vLy8vL3dFYURBQmszVHdYMjY1ZXA1dmxWQ0xwQVR2TnZRR2QxTXNSZWhSWmJsTm8yUGltYkx3bEE4NHJtZ3h6emx4YzVkQjkyWXhBbVNBbGVyL0x4L1FISUlma1FDQlczeXlQakJ2dkNzODVqYWREOGQ1M3JhSHdDWTNHeGJpTVMwRGhydWEzNzVaV09IY2ZpWU5LMDFwb0VWZktuNENSNmFhMUtCMWNEZzA5ZHJMSDRRQitBYWxLbG1NbFoyZnorU2lHdXQxSGxKRGdKa1NOLzdqY0pvTXA2TjUvRjd5enY1RjU0QTNVYlFLNjd4Z0ZkWnpsaVREWFpXVFIzUUZzNlpHSmpvMmgxaktKamZOVnkzdm9YSmJQMmY4SWYvN3VhZzUwMjlDdHpadXpvb3MvQmdQWlNBb09aVkdYME5vS0ExaVNpRmxNVXFoVDBuOEl5dkZtS1B2TzVkNEYifV19\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"signature\"\r\n\r\nJMaL9FOc6Dhs2uozlX2csHrfHUU=\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"file\"; filename=\"/path/to/file.txt\"\r\nContent-Type: text/plain\r\n\r\n\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--");
Request request = new Request.Builder()
  .url("https://brainsinsclients.s3.amazonaws.com")
  .post(body)
  .addHeader("content-type", "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW")
  .addHeader("Content-Type", "application/x-www-form-urlencoded")
  .addHeader("cache-control", "no-cache")
  .addHeader("Postman-Token", "cc5753bb-d3af-4a9a-b925-f47a2b646b64")
  .build();

Response response = client.newCall(request).execute();
```
Ejemplo de código CURL:
```bash
curl -X POST \
  https://brainsinsclients.s3.amazonaws.com \
  -H 'content-type: multipart/form-data;' \
  -H 'cache-control: no-cache' \
  -F key=BS-0123456789-1/clientuploads/upload.xml \
  -F AWSAccessKeyId=ASIATOPOE4TCLXZ6NIPN \
  -F 'x-amz-security-token=FQoGZXIvYXdzEKL//////////wEaDABk3TwX265ep5vlVCLpATvNvQGd1MsRehRZblNo2PimbLwlA84rmgxzzlxc5dB92YxAmSAler/Lx/QHIIfkQCBW3yyPjBvvCs85jadD8d53raHwCY3GxbiMS0Dhrua375ZWOHcfiYNK01poEVfKn4CR6aa1KB1cDg09drLH4QB+AalKlmMlZ2fz+SiGut1HlJDgJkSN/7jcJoMp6N5/F7yzv5F54A3UbQK67xgFdZzliTDXZWTR3QFs6ZGJjo2h1jKJjfNVy3voXJbP2f8If/7uag5029CtzZuzoos/BgPZSAoOZVGX0NoKA1iSiFlMUqhT0n8IyvFmKPvO5d4F' \
  -F policy=eyJleHBpcmF0aW9uIjogIjIwMTgtMTAtMzFUMTA6MTI6NDBaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAiYnJhaW5zaW5zY2xpZW50cyJ9LCB7ImtleSI6ICJCUy05MDgyNzEyMjE5LTEvY2xpZW50dXBsb2Fkcy91cGxvYWQueG1sIn0sIHsieC1hbXotc2VjdXJpdHktdG9rZW4iOiAiRlFvR1pYSXZZWGR6RUtMLy8vLy8vLy8vL3dFYURBQmszVHdYMjY1ZXA1dmxWQ0xwQVR2TnZRR2QxTXNSZWhSWmJsTm8yUGltYkx3bEE4NHJtZ3h6emx4YzVkQjkyWXhBbVNBbGVyL0x4L1FISUlma1FDQlczeXlQakJ2dkNzODVqYWREOGQ1M3JhSHdDWTNHeGJpTVMwRGhydWEzNzVaV09IY2ZpWU5LMDFwb0VWZktuNENSNmFhMUtCMWNEZzA5ZHJMSDRRQitBYWxLbG1NbFoyZnorU2lHdXQxSGxKRGdKa1NOLzdqY0pvTXA2TjUvRjd5enY1RjU0QTNVYlFLNjd4Z0ZkWnpsaVREWFpXVFIzUUZzNlpHSmpvMmgxaktKamZOVnkzdm9YSmJQMmY4SWYvN3VhZzUwMjlDdHpadXpvb3MvQmdQWlNBb09aVkdYME5vS0ExaVNpRmxNVXFoVDBuOEl5dkZtS1B2TzVkNEYifV19 \
  -F signature=AIp6gb271FtiEW6icLHfZHYqTAs= \
  -F file=@/path/to/file.txt
```