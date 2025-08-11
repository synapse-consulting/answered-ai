<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Workflow Builder</title>
    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/js/app.js', 'resources/js/app.tsx'])
        {{-- Common scripts --}}
    @vite('resources/js/app.js')
</head>
  <body style="margin:0px;" class="antialiased">
      <div id="react-root"></div>
  </body>
</html>
