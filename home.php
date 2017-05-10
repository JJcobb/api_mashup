<!DOCTYPE html>
<html>
  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Wild Observer</title>

    <!--Import Google Icon Font-->
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.1/css/materialize.min.css">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- my css -->
    <link rel="stylesheet" href="css/styles.css">

  </head>
  <body>
    

    <!-- <div id="info" class="modal"></div> -->

    
    <ul id="slide-out" class="side-nav fixed transparent-bg">

      <img class="center-align logo" src="img/wild-observer-logo.png" width="200">

      <p class="tagline">
        Search through over a million wildlife sightings gathered by naturalists, scientists, and members of the public all over the globe.
        <br>
        <button class="btn green darken-4 waves-effect waves-light" id="explore">Explore</button>
      </p>


      

      <!-- <div class="container"> -->
        <div class="row form-container no-bottom">

          <form class="col s12" name="search-form" id="search-form">

            <div class="form-top">

              <div class="row">

                <div class="input-field col s12">
                  <input type="text" id="taxon-name" name="taxon-name" required>
                  <label for="taxon-name">What are you searching for? <span class="tooltipped hide-on-med-and-down" data-position="right" data-delay="50" data-tooltip="Searches for both common and scientific names"><i class="fa fa-info-circle"></i></span></label>
                </div>

                <div class="input-field col s12">
                  <input type="text" id="location" name="location" required>
                  <label for="location">Where would you like to look?</label>
                </div>

                <div class="input-field col s12">
                  <input type="number" id="radius" name="radius" required>
                  <label for="radius">Within how many miles?</label>
                </div>  

              </div>


              <div class="row">

                <p class="center-align"><a href="#!" id="show-filters" class="green-text accent-4">More Filters <i class="fa fa-arrow-down" aria-hidden="true"></i></a></p>

                <div id="extra-filters">


                  <div class="input-field col m6 s12">
                    <input type="date" id="date1" name="date1" class="">
                    <label class="active" for="date1">Start Date</label>
                  </div>

                  <div class="input-field col m6 s12">
                    <input type="date" id="date2" name="date2" class="">
                    <label class="active" for="date2">End Date</label>
                  </div>

                  <div class="col m6 s12">
                    <input type="checkbox" id="captive" name="captive" class="filled-in">
                    <label for="captive" class="tooltipped" data-position="top" data-delay="50" data-tooltip="Only show captive observations"><strong>Captive</strong></label>
                  </div>

                  <div class="col m6 s12">
                    <input type="checkbox" id="threatened" name="threatened" class="filled-in">
                    <label for="threatened" class="tooltipped" data-position="top" data-delay="50" data-tooltip="Only show observations threatened in their location"><strong>Threatened</strong></label>
                  </div>

                  <div class="col m6 s12">
                    <input type="checkbox" id="native" name="native" class="filled-in">
                    <label for="native" class="tooltipped" data-position="top" data-delay="50" data-tooltip="Only show observations native to their location"><strong>Native</strong></label>
                  </div>

                  <div class="col m6 s12">
                    <input type="checkbox" id="endemic" name="endemic" class="filled-in">
                    <label for="endemic" class="tooltipped" data-position="top" data-delay="50" data-tooltip="Only show observations endemic to their location"><strong>Endemic</strong></label>
                  </div>

                  <div class="input-field col s12">
                    <select id="results" name="results">
                      <option value="default" disabled selected>Results to show</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="75">75</option>
                      <option value="100">100</option>
                      <option value="99999">All</option>
                    </select>
                    <label class="hide">Results to show</label>
                  </div>

                </div>


              </div>

            </div>

            <div class="row form-bottom no-bottom">

              <div class="col s10 offset-s1 center-align">
                <button class="btn btn-full green darken-4 waves-effect waves-light" type="submit" id="search">Search</button>
              </div>

            </div>

          </form> <!-- END form -->

        </div>

      <!-- </div> --> <!-- END container -->


    </ul>
    <a href="#" data-activates="slide-out" class="button-collapse hide-on-large-only">
      <img src="img/compass-green.png" width="30">
    </a>



    <main>

      <div class="row no-margin">

        <div class="col s12 no-padding">

          <div id="map"></div>

        </div>

      </div>

    </main>





    <!-- jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

    <!-- Materialize -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.1/js/materialize.min.js"></script>

    <!-- moment.js -->
    <script src="js/moment.min.js"></script>

    <!-- my scripts -->
    <script src="js/scripts.js"></script>

    <!-- Google maps -->
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD_viTpP51ZIanEUCpHJSDQTeH0c_fuNnU&callback=initMap">
    </script>

  </body>
</html>