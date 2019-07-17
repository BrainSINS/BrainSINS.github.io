---
title: "Javascript"
metaTitle: "Javascript"
metaDescription: "Integración del tag script"
---

# Inclusión del tag script
El primer paso consiste en incluir un script javascript que llama a nuestra API en cada página de de tu tienda online, al final del BODY:

```html
<!-- BrainSINS Code Starts -->
<script type="text/javascript">
   brainsins_token = "TOKEN";
</script>
<script type="text/javascript" async="" src="//d2xkqxdy6ewr93.cloudfront.net/brainsins.js" charset="UTF-8"></script>
<!-- BrainSINS Code Ends -->
```

La variable "TOKEN" debe ser reemplazada por tu ID único de cliente de BrainSINS que tiene la siguiente estructura: BS-0000000000-1. Puedes encontrar este ID accediendo a nuestra [herramienta de administración](https://analytics.brainsins.com/).

Por ejemplo, si tu ID de cliente (token) es “BS-1234567890-1″, el código que deberás pegar al final de la sección BODY de tu tienda online sería:

```html
<body>
<!-- BrainSINS Code Starts -->
<script type="text/javascript">
   brainsins_token = "BS-1234567890-1";
</script>
<script type="text/javascript" async="" src="//d2xkqxdy6ewr93.cloudfront.net/brainsins.js"></script>
<!-- BrainSINS Code Ends -->
</body>
```