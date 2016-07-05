var app = angular.module('app')
.controller('mainController', ['$scope', '$window', '$http', 'socket','ionicDatePicker', '$ionicScrollDelegate', '$ionicLoading', function($scope, $window, $http, socket, ionicDatePicker, $ionicScrollDelegate, $ionicLoading){
    jQuery(document).ready( function () {
      console.log("Hello from jQuery");
      jQuery(".tab1").on("click", function () {
        jQuery(".tab1").removeClass("active");
        jQuery(".tab1").children().removeClass("pink_color");
        jQuery(this).addClass("active");
        jQuery(this).children().addClass("pink_color");
      });

      jQuery(".tab3").on("click", function () {
        jQuery(".tab3").removeClass("tab_hover");
        jQuery(".tab3").children().removeClass("pink_color");
        jQuery(this).children().addClass("pink_color");
        jQuery(this).addClass("tab_hover");
      });
      jQuery(".tab2").on("click", function () {
        jQuery(".tab2").removeClass("tab_hover");
        jQuery(".tab2").children().removeClass("pink_color");
        jQuery(this).children().addClass("pink_color");
        jQuery(this).addClass("tab_hover");
      });

      // use this variable
      // to check where the user in chat application
      $scope.onChatPage = false;
  //    var socket = io.connect("http://112.78.3.114:8081");
      var connectionString = "http://112.78.3.114:8081";
      $scope.user = {
        name: 'Phan Dinh Huy',
        email: '',
        password: '',
        phone: '0126 456 9203',
        address: 'Mountain View, CA',
        WWID: '11632292',
        donation: 19.99,
        badges: 108,
        avartar: 'img/avarta/default.png'
      };
      jQuery(window).resize(function () {
        jQuery("#chatbody").css("height", jQuery(window).height() - 100);
        jQuery("#divChuaTbChat").css("margin-top", jQuery(window).height() - 50);
      });
      socket.setSocketLink(connectionString);
      jQuery("#chatbody").css("height", jQuery(window).height() - 100);
      jQuery("#divChuaTbChat").css("margin-top", jQuery(window).height() - 50);
      jQuery("#popup_selectFood").css("margin-top", (jQuery(window).height() - 240) / 2 );
      jQuery("#body_to_scroll").css("height", (jQuery(window).height() - 100));
      $scope.formatTime = function (datetime) {
        var state = "";
        var h = datetime.getHours();
        if (h > 12) {
          h = h - 12;
          state = "pm";
        }
        else {
          state = "am";
        }
        var min = datetime.getMinutes();
        if (min < 10) {
          min = "0"+ min;
        }
        return h + ":" + min + " " + state;
      };
//      $scope.animateBackGroundRevert = function () {
//        jQuery(".wallPaper").animate( { left: "+=1" }, 60, function () {
//          //console.log(jQuery(".wallPaper").css("left"));
//          if (jQuery(".wallPaper").css("left") == "0px") {
//            $scope.animateBackGround();
//          }
//          else {
//            $scope.animateBackGroundRevert();
//          }
//        });
//

//      };
      jQuery(".menu").hide();
      jQuery("#foodMenu").show();
//      $http.get("http://112.78.3.114:8000/foodService.asmx/getAllFood").then(function(response) {
//        console.log(response.data);
//        $scope.foodBin = response.data;
//        $scope.currentSelectedFood = $scope.foodBin;
//      });
//      $http.get("http://112.78.3.114:8000/foodService.asmx/getAllDrink").then(function(response) {
//        console.log(response.data);
//        $scope.drinkBin = response.data;
//        $scope.currentSelectedDrink = $scope.drinkBin;
//      });
      $scope.todayFoods = [];
      $http.get("http://112.78.3.114:8000/foodService.asmx/getAllFoodFromMychoice").then(function(response) {
        $scope.todayFoods = [];
        var daybin = ["sun", "mon", "tues", "wed", "thur", "fri", "sat"];
        var today = new Date();
        var todayInt = today.getDay();
        console.log(todayInt);
        var todayString = daybin[todayInt];
        $scope.allFoods = response.data;
        for (i = 0; i <= $scope.allFoods.length - 1; i++) {
          // them vao price C
          $scope.allFoods[i].price_C = $scope.allFoods[i].price_L;
          if ($scope.allFoods[i].day == todayString) {
            $scope.todayFoods.push($scope.allFoods[i]);
            console.log($scope.todayFoods);
          };
        };
      });
      $http.get("http://112.78.3.114:8000/foodService.asmx/getAllDrinkFromHighland").then(function(response) {
        for (i = 0; i <= response.data.length - 1; i++) {
          response.data[i].price_C = response.data[i].price_L;
        };
        $scope.highlandDrinks = response.data;
        console.log(response.data);
      });
      $http.get("http://112.78.3.114:8000/foodService.asmx/getAllDrinkFromMatMat").then(function(response) {
        for (i = 0; i <= response.data.length - 1; i++) {
          response.data[i].price_C = response.data[i].price_L;
        };
        console.log(response.data);
        $scope.matmatDrinks = response.data;
      });
//      $scope.animateBackGround = function () {
//        jQuery(".wallPaper").animate( { left: "-=1" }, 60, function () {
//          //console.log(jQuery(".wallPaper").css("left"));
//          if (jQuery(".wallPaper").css("left") == "-280px") {
//            $scope.animateBackGroundRevert();
//          }
//          else {
//            $scope.animateBackGround();
//          }
//
//        });

//      };
//      $scope.animateBackGround();
      jQuery(".tab_content").hide();
      jQuery("#div_userInfo").show();
      $scope.showUserInfoDiv = function () {
        jQuery(".tab_content").hide();
        jQuery("#div_userInfo").fadeIn(300);
      };
      $scope.showMyBillsDiv = function () {
        jQuery(".tab_content").hide();
        jQuery("#div_myBillings").fadeIn(300);
      };
      $scope.showSettingsDiv = function () {
        jQuery(".tab_content").hide();
        jQuery("#div_settings").fadeIn(300);
      };
      jQuery("#matmatDrinkDiv").hide();
      $scope.showHighlandDrinkDiv = function () {
        jQuery("#highlandDrinkDiv").fadeIn(300);
        jQuery("#matmatDrinkDiv").hide();
      };
      $scope.showMatMatDrinkDiv = function () {
        jQuery("#matmatDrinkDiv").fadeIn(300);
        jQuery("#highlandDrinkDiv").hide();
      };
//      $scope.animateBackGround();
      $scope.pageTitle = "Cafeteria Service";
      var serverLink = 'http://112.78.3.114:8081/';
      var month_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
      var week_days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      var ipObj1 = {
        callback: function (val) {  //Mandatory
          console.log('Return value from the datepicker popup is : ' + val, new Date(val));
          var daySelected = new Date(val);
          $scope.getToDayDate(daySelected);
          $scope.todayFoods = [];
          var daybin = ["sun", "mon", "tues", "wed", "thur", "fri", "sat"];
          var today = daySelected;
          var todayInt = today.getDay();
          console.log(todayInt);
          var todayString = daybin[todayInt];
          for (i = 0; i <= $scope.allFoods.length - 1; i++) {
            if ($scope.allFoods[i].day == todayString) {
              $scope.todayFoods.push($scope.allFoods[i]);
              console.log($scope.todayFoods);
            };
          };
          jQuery(".menu").hide();
          jQuery("#foodMenu").fadeIn(300);
        },
        disabledDates: [            //Optional
          new Date(2016, 2, 16),
          new Date(2015, 3, 16),
          new Date(2015, 4, 16),
          new Date(2015, 5, 16),
          new Date('Wednesday, August 12, 2015'),
          new Date("08-16-2016"),
          new Date(1439676000000)
        ],
        from: new Date(2012, 1, 1), //Optional
        to: new Date(2016, 10, 30), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: true,          //Optional
        disableWeekdays: [0],       //Optional
        closeOnSelect: false,       //Optional
        templateType: 'modal'       //Optional
      };
      $scope.openDatePicker = function(){
        ionicDatePicker.openDatePicker(ipObj1);
      };
      jQuery(".tab-item").on("click", function () {
        jQuery(".tab-item").removeClass("pink_color");
        jQuery(this).addClass("pink_color");
      });
      $scope.showContent1 = true;
      $scope.showContent2 = false;
      $scope.showContent3 = false;
      $scope.showTab1 = function () {
        jQuery(".menu").hide();
        jQuery("#foodMenu").fadeIn(300);
        $scope.isSelectedObj_Food = true;
        $scope.onChatPage = false;
      };
      $scope.showTab2 = function () {
        jQuery(".menu").hide();
        jQuery("#drinkMenu").fadeIn(300);
        $scope.isSelectedObj_Food = false;
        $scope.onChatPage = false;
      };
      $scope.showTab3 = function () {
        jQuery(".menu").hide();
        jQuery("#cartMenu").fadeIn(300);
        $scope.onChatPage = false;
      };
      $scope.areThereAnyThingSelected = function () {
        var ar1 = $scope.areThereAnyFoodSelected();
        var ar2 = $scope.areThereAnyDrinkSelected();
        return ar1 || ar2;
      };
      $scope.getToDayDate = function(date){
        if (date != null) {
          var toDay = date;
        }
        else {
          var toDay = new Date();
        };
        var curr_day = toDay.getDate();
        var week_day = toDay.getDay();
        var curr_day_string = "";
        if (curr_day == 1){
          curr_day_string = "1st";
        }
        if (curr_day == 2){
          curr_day_string = "2nd";
        }
        if (curr_day == 3){
          curr_day_string = "3rd";
        }
        else {
          curr_day_string = curr_day + "th";
        }
        var curr_mon = toDay.getMonth();
        var string = week_days[week_day] + ", " + month_names[curr_mon - 1] + " " + curr_day_string;
        $scope.selectedDate = string;
      };
      $scope.getToDayDate();
      // Date Picker Angular Matyerial
      $scope.myDate = new Date();
      $scope.minDate = new Date(
          $scope.myDate.getFullYear(),
          $scope.myDate.getMonth() - 2,
          $scope.myDate.getDate());
      $scope.maxDate = new Date(
          $scope.myDate.getFullYear(),
          $scope.myDate.getMonth() + 2,
          $scope.myDate.getDate());
      $scope.onlyWeekendsPredicate = function(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
      };
      // end of date picker angular Matyerial

      $scope.toggleLeftSideMenu = function () {
        jQuery("#divNenDen2").css({"right":"1000px","display":"inline-block"}).animate({right:"0px"},"slow,50");
      };


      $scope.notificationText = "Hello there";
      $scope.loginObj = {
        email: $window.localStorage['emailAutoLogin'],
        password: $window.localStorage['passwordAutoLogin']
      };
      var autoLogin = function () {
        if ($window.localStorage['emailAutoLogin'] != null) {
          $scope.user.email = $window.localStorage['emailAutoLogin'];
          $scope.user.password = $window.localStorage['passwordAutoLogin'];
          $scope.user.name = $window.localStorage['nameAutoLogin'];
          $scope.user.phone = $window.localStorage['phoneAutoLogin'];
          $scope.user.address = $window.localStorage['addressAutoLogin'];
          socket.emit("oneClientConnected", { data: $scope.user});
          console.log("auto login: " + $window.localStorage['emailAutoLogin']);
          // animate the login sucess
          jQuery(".firstPage").fadeOut();
          jQuery("#lb_loginFailed").hide();
        }
      };
      autoLogin();
      $scope.performLogOut = function () {
        jQuery(".firstPage").hide().fadeIn();
        console.log("Log out clicked");
      };
      $scope.performLogin = function () {
        $ionicLoading.show();
        if ($scope.loginObj.email == 'admin' & $scope.loginObj.password == '123' ) {
          jQuery(".firstPage").fadeOut();
          jQuery(".firstPage").hide();
          $ionicLoading.hide();
        }
        else {
          console.log("another login");
          $http.get("http://112.78.3.114:8000/foodService.asmx/login").then(function (response) {
            var result = response.data;
            console.log(result.length);
            for (i = 0; i <= result.length - 1; i ++) {
              console.log(result[i].email + " " + result[i].password);
              if ($scope.loginObj.email == result[i].email & $scope.loginObj.password == result[i].password ) {
                $scope.user.email = result[i].email;
                $scope.user.password = result[i].password;
                $scope.user.name = result[i].fullname;
                $scope.user.phone = result[i].phone;
                $scope.user.address = result[i].address;
                socket.emit("oneClientConnected", { data: $scope.user});
                $window.localStorage['emailAutoLogin'] = $scope.user.email;
                $window.localStorage['passwordAutoLogin'] = $scope.user.password;
                $window.localStorage['nameAutoLogin'] = $scope.user.name;
                $window.localStorage['phoneAutoLogin'] = $scope.user.phone;
                $window.localStorage['addressAutoLogin'] = $scope.user.address;
                console.log("Autologin for:" + $window.localStorage['emailAutoLogin'] + ", " + $window.localStorage['passwordAutoLogin']);
                $scope.loginObj = {
                  email: "",
                  password: ""
                };
                $ionicLoading.hide();
                jQuery(".firstPage").fadeOut();
                jQuery("#lb_loginFailed").hide();
                break;
              }
              else {
                if (i >= result.length - 1 ) {
                  $ionicLoading.hide();
                  console.log("Login failed");
                  jQuery("#lb_loginFailed").show();
                }
              }
            };
            });
        }


      };
      $scope.checkOdd = function (value) {
        if (value % 2 == 1){
          return true;
        }
        else {
          return false;
        }
      };
      $scope.shoppingCart = {
        foods: [],
        drinks: []
      };

      $scope.selectedFoodObj = {};
      $scope.isSelectedObj_Food = true;
      $scope.analyzeThisFood = function (foodObj) {
        $scope.selectedFoodObj = foodObj;
        $scope.selectedFoodObj.quantity = 1;
        $scope.selectedFoodObj.money = $scope.selectedFoodObj.quantity * $scope.selectedFoodObj.price_C;
        console.log($scope.selectedFoodObj);
        jQuery("#divNenDen").css("display", "inline-block");
        jQuery("#popup_selectFood").css("display", "inline-block").animate({
          "margin-top": (jQuery(window).height() - 200) / 2
        }, 200);
      };
      $scope.increase = function (obj) {
        obj.quantity += 1;
      };
      $scope.decrease = function (obj) {
        if (obj.quantity >= 2) {
          obj.quantity -= 1;
        };
      };
      $scope.addThisFoodToShoppingCart = function () {
        if ($scope.isSelectedObj_Food) {
          $scope.shoppingCart.foods.push($scope.selectedFoodObj);
        }
        else {
          $scope.shoppingCart.drinks.push($scope.selectedFoodObj);
        };
        jQuery("#popup_selectFood").animate({"margin-top": (jQuery(window).height() - 240) / 2}, 200, function () {
          jQuery("#divNenDen").css("display", "none");
        });
        jQuery("#popup_selectFood").fadeOut(200);

      };

      jQuery("#divNenDen").on("click", function () {
        jQuery("#popup_selectFood").animate({"margin-top": (jQuery(window).height() - 240) / 2}, 200, function () {
          jQuery("#divNenDen").css("display", "none");
        });

        jQuery("#popup_selectFood").fadeOut(200);
        jQuery("#popup_passwordConfirm").fadeOut(200);
      });
      $scope.animateNenDen = function () {
        jQuery("#divNenDen2").animate({right:"1000px"},"slow,50");;
      };
      $scope.hideChatInterface = function () {
        jQuery("#divNenDen3").animate({left:"1000px"},"slow,50");
        $scope.onChatPage = false;
      };
      $scope.messages = [

        {
          author: "My Choices",
          time: "6:00 am",
          type: false,
          content: "Hi there. Please let us know if you need any help."
        }

      ];
      $scope.openChatInterface = function () {
        jQuery("#divNenDen3").css({"left":"1000px","display": "inline-block"}).animate({left:"0px"},"slow,50");
      //  jQuery("#messageTextBox").focus();
        console.log("focused");
        $scope.onChatPage = true;
      };
      jQuery("#divNenDen2").on("click", function () {
        jQuery(this).css("display", "none");
      });
      jQuery("#divNenDen3").on("click", function () {
        jQuery(this).css("display", "none");
      });
      jQuery(".sidemenu").on("click", function (e) {
        e.stopPropagation();
      });

      $scope.pushThisMessage = function () {
        if ($scope.tb_newMessage !== "") {
          var message = {};
          message.author = $scope.user.name;
          message.time = $scope.formatTime(new Date());
          message.type = true;
          message.content = $scope.tb_newMessage;
          message.id = $scope.user.WWID;
          console.log(message);
          $scope.messages.push(message);

          $scope.tb_newMessage = "";
          // send this message to server
          // but before that
          // change type to false to alternate css template on the other end
          //    message.type = false;
          socket.emit("messageFromClientToServer", { data: message });
  //        chatAutoScroll();
        };
      };
      socket.on("StoreTransferThisMessageToClient", function (response) {
        var message = response.data;
        message.type = false;
        $scope.messages.push(message);
  //      chatAutoScroll();
        console.log(message);
        if ($scope.onChatPage == false) {
          $scope.notificationText = response.data.content;
          jQuery(".popup_notification").slideDown(200);
        };
      });
      $scope.addThisDrinkToShoppingCart = function (drinkObj) {
        drinkObj.quantity = 1;
        $scope.shoppingCart.drinks.push(drinkObj);
      };
      $scope.changeThisFoodQuantity = function (index, value) {
        if (value != null) {
          $scope.shoppingCart.foods[index].quantity = parseInt(value);
        };
      };
      $scope.changeThisDrinkQuantity = function (index, value) {
        if (value != null) {
          $scope.shoppingCart.drinks[index].quantity = parseInt(value);
        };
      };
      $scope.getPartialMoney = function (price, quantity) {
        return parseInt(price) * parseInt(quantity);
      };
      $scope.removeThisFoodFromShopingCart = function (index) {
        $scope.shoppingCart.foods.splice(index, 1);
      };
      $scope.removeThisDrinkFromShopingCart = function (index) {
        $scope.shoppingCart.drinks.splice(index, 1);
      };
      $scope.calculateToTalCost = function () {
        var totalCost = 0;
        if ($scope.shoppingCart.foods.length > 0) {
          for (i = 0; i <= $scope.shoppingCart.foods.length - 1; i++) {
            totalCost += (parseInt($scope.shoppingCart.foods[i].price_C) * parseInt($scope.shoppingCart.foods[i].quantity));
          };
        };
        if ($scope.shoppingCart.drinks.length > 0) {
          for (i = 0; i <= $scope.shoppingCart.drinks.length - 1; i++) {
            totalCost += (parseInt($scope.shoppingCart.drinks[i].price_C) * parseInt($scope.shoppingCart.drinks[i].quantity));
          };
        };
        return totalCost.toString();
      };
      $scope.howManyItemSelected = function () {
        var count = $scope.shoppingCart.foods.length + $scope.shoppingCart.drinks.length;
        return count.toString();
      };
      $scope.areThereAnyFoodSelected = function () {
        if ($scope.shoppingCart.foods.length > 0) {
          return true;
        }
        else {
          return false;
        };
      };
      $scope.areThereAnyDrinkSelected = function () {
        if ($scope.shoppingCart.drinks.length > 0) {
          return true;
        }
        else {
          return false;
        };
      };
      $scope.foodListSelected = true;
      $scope.drinkListSelected = false;
      $scope.showFood = function (){
        $scope.foodListSelected = true;
        $scope.drinkListSelected = false;
      };
      $scope.showDrink = function (){
        $scope.foodListSelected = false;
        $scope.drinkListSelected = true;
      };

      $scope.dSize = 1;
      $scope.changeToSizeLarge = function (obj) {
        obj.price_C = obj.price_L;
      };
      $scope.changeToSizeMed = function (obj) {
        obj.price_C = obj.price_M;
      };
  //    $scope.userComment = "at store";
      $scope.userComment = $scope.user.address;

      $scope.sendThisBillToServer = function() {
        var package = {};
        package.customerName = $scope.user.name;
        package.WWID = $scope.user.WWID;
        package.avartar = $scope.user.avartar;
        package.comment = $scope.userComment;
        package.payment = "cash";
        package.email = $scope.user.email;
        package.phone = $scope.user.phone;
        package.address = $scope.user.address;
        var now = new Date();
        package.time = $scope.formatTime(now);
        package.items = $scope.shoppingCart;
        console.log(package);
        socket.emit('sendThisOrder', { data: package });
        $scope.shoppingCart = {
          foods: [],
          drinks: []
        };
      };

      $scope.passConfirm = "";
      $scope.passStatus = "Enter your password"
      $scope.popup_password = function(){
        jQuery("#popup_passwordConfirm").css({"display":"inline-block"}).animate({"margin-top": (jQuery(window).height() - 90) / 2},200,function(){
            jQuery("#divNenDen").css("display", "inline-block");
        });
      };

      $scope.cancel_popup_password = function(){
        jQuery("#popup_passwordConfirm").css({"display":"none"});
        jQuery("#popup_passwordConfirm").fadeOut(200);
        jQuery("#divNenDen").css("display", "none");
      };

      $scope.oldBills = [];

      $scope.confirmCode = function(){
        var password = $scope.user.password;
        console.log(password);
        if(password == $scope.passConfirm){
          var package = {};
          package.customerName = $scope.user.name;
          package.WWID = $scope.user.WWID;
          package.avartar = $scope.user.avartar;
          package.comment = $scope.userComment;
          package.payment = "cash";
          package.email = $scope.user.email;
          package.phone = $scope.user.phone;
          package.address = $scope.user.address;
          var now = new Date();
          package.time = $scope.formatTime(now);
          package.items = $scope.shoppingCart;
          package.status = "Waiting for confirmation...";
          console.log(package);
          $scope.oldBills.push(package);
          // send this bill to overall server
          socket.emit('sendThisOrder', { data: package });

          // send this bill to Mychoice
          // if there are anyfood from shooping cart
          var mychoiceNum = $scope.shoppingCart.foods.length;
          if (mychoiceNum > 0) {
            var mychoiceShoppingCart = {
              foods: [],
              drinks: []
            };
            for (i = 0; i <= mychoiceNum - 1; i++) {
              mychoiceShoppingCart.foods.push($scope.shoppingCart.foods[i]);
            };

            package.items = mychoiceShoppingCart;
            console.log(package.items);
            socket.emit('sendThisBillToMyChoiceButFirstToServer', { data: package });
          };

          // send this bill to highland
          // if there are any highland order selected
          var highlandShoppingCart = {
            foods: [],
            drinks: []
          };
          var matmatShoppingCart = {
            foods: [],
            drinks: []
          };
          for (j = 0; j <= $scope.shoppingCart.drinks.length - 1; j++) {
            if ($scope.shoppingCart.drinks[j].store == "highland") {
              highlandShoppingCart.drinks.push($scope.shoppingCart.drinks[j]);
            }
            else {
              matmatShoppingCart.drinks.push($scope.shoppingCart.drinks[j]);
            };
          };
          var highlandNum = highlandShoppingCart.drinks.length;
          var matmatNum = matmatShoppingCart.drinks.length;

          if (highlandNum > 0) {
            package.items = highlandShoppingCart;
            console.log(package.items);
            socket.emit('sendThisBillToHighlandButFirstToServer', { data: package });
          };
          if (matmatNum > 0) {
            package.items = matmatShoppingCart;
            console.log(package.items);
            socket.emit('sendThisBillToMatMatButFirstToServer', { data: package });
          };
           // giao dich thanh cong
           // reinnitiate shopping card
           $scope.shoppingCart = {
             foods: [],
             drinks: []
           };
           package = {};

          $scope.passStatus = "Your password is correct";
          jQuery("#popup_passwordConfirm").css({"display":"none"});
          jQuery("#popup_passwordConfirm").fadeOut(200);
          jQuery("#divNenDen").css("display", "none");
          $scope.passConfirm = "";
        }
        else{
          $scope.passStatus = "Your password is incorrect";
          $scope.passConfirm = "";
        }
      };

      socket.on("setClientId", function (response) {
        var id = response.data;
        $scope.user.WWID = id;

      });
      socket.on("storeAcceptOrRejectThisOrderSentByServer", function (response) {
        var confirmText = response.data.text;
        if (confirmText == 'accept') {
          $scope.notificationText = "Your order has been accepted :)";
          jQuery(".popup_notification").slideDown(200);
          console.log('accept');
          var lastOrder = $scope.oldBills.length - 1;
          $scope.oldBills[lastOrder].status = "Your order has been accepted!";
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Store Message',
            text: 'Your order has been accepted!'
            }).then(function (result) {
              console.log(result);
            });
        }
        else {
          $scope.notificationText = "Your order has been rejected :(";
          jQuery(".popup_notification").slideDown(200);
          console.log('reject');
          var lastOrder = $scope.oldBills.length - 1;
          $scope.oldBills[lastOrder].status = "Your order has been rejected!";
          $cordovaLocalNotification.schedule({
            id: 2,
            title: 'Store Message',
            text: 'Your order has been rejected!'
            }).then(function (result) {
              console.log(result);
            });
        }


      });
      socket.on("storeNotifyThatThisOrderIsDonSentByServer", function (response) {
        var confirmText = response.data.text;
        console.log(confirmText);
        $scope.notificationText = "Your order is ready!";
        jQuery(".popup_notification").slideDown(200);
        var lastOrder = $scope.oldBills.length - 1;
        $scope.oldBills[lastOrder].status = "Your order is ready to pick up!";
        $cordovaLocalNotification.schedule({
          id: 3,
          title: 'Store Message',
          text: 'You can now pick up your order!'
          }).then(function (result) {
            console.log(result);
          });
      });
      $scope.areThereAnyOldOder = function () {
        if ($scope.oldBills.length <= 0) {
          return true;
        }
        else {
          return false;
        }
      };
      $scope.hideNotification = function () {
        jQuery(".popup_notification").slideUp();
      };
      $scope.createBlankBill = function () {
        $scope.shoppingCart = {
          foods: [],
          drinks: []
        };
      };
      $scope.shouldIShowBtnCheckOut = function () {
        if (($scope.shoppingCart.foods.length + $scope.shoppingCart.drinks.length) > 0) {
          return true;
        }
        else {
          return false;
        }
      };

    });

}]);
