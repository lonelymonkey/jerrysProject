<html>
  <head>
    <title>Guide LOL</title>
    <script
      src="https://code.jquery.com/jquery-3.3.1.js"
      integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
      crossorigin="anonymous">
    </script>
    <script src="../js/myapp_ajax.js"></script>
    <script src="../js/myapp_main.js"></script>
    <script src="../js/myapp_create.js"></script>
    <script src="../js/myapp_sspell.js"></script>
    <script src="../js/myapp_ability.js"></script>
    <script src="../js/myapp_items_pool.js"></script>
    <script src="../js/myapp_items_selection.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="../css/style_main.css" rel="stylesheet">
    <link href="../css/style_create.css" rel="stylesheet">
    <link href="../css/style_sspell.css" rel="stylesheet">
    <link href="../css/style_items.css" rel="stylesheet">

  </head>
  <body background = "../assets/other/background.jpg">
    <div id = "lol_app">

    </div>
    <div id = "modal_field"></div>


</div>
  </body>
</html>

<script>
  $(document).ready(function(){
    myApp.load(
      {
        id : "lol_app",
        ajax_url : "../ajax/data.php"
      }
    );
  });

</script>
