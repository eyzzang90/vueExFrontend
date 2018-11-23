/* 자동 로그인 해제 */
document.cookie = 'alKey=escape("");path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=.interpark.com';
document.cookie = 'alMemNo=escape("");path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=.interpark.com';
/* 자동 로그인 해제 : 끝 */


//콘솔 INITIALIZE
if( window.console === undefined ){ console = { log : function(){} }; }

var locPort = window.location.port;
var httpDomain;	//일반도메인
var sslDomain;	//SSL도메인

var sid1Name = "gb";	// 와이즈로그 파라미터
var sid2Name = "";
var sid3Name = "";
var sid4Name = "";

var wid1Name="kang";	//20160205 히트수파악 와이즈로그 추가(강희경대리 요청)

var wiselog = "";		// 와이즈로그 추가 - 20120312 유현재

var m_loc = location.href;
var m_img_url = "";

if(m_loc.indexOf("https://") >= 0) {
  m_img_url = "https://sslimage.interpark.com";
} else {
  m_img_url = "http://openimage.interpark.com";
}

if(locPort.length > 0) {
  httpDomain = "http://www.interpark.com:" + locPort;
  sslDomain = "https://www.interpark.com:" + locPort;
} else {
  httpDomain = "http://www.interpark.com";
  sslDomain = "https://www.interpark.com";
}

//2014-11-19 toy.interpark check
var toyDomain = 'http://toy.interpark.com';
var isItoy = window.location.hostname.split('.')[0] === 'toy';

var mycartLink;
var jjimLink;

if (isItoy) {
  mycartLink = toyDomain + '/order/cartmalllist.do?_method=cartList&sid1=' + sid1Name + '&sid2=svc';
  jjimLink = toyDomain + '/gate/MallZZimList.do?_method=ZZimList';
} else{
  mycartLink = httpDomain + '/order/cartlist.do?_method=cartList&logintgt=cart&wid1=' + wid1Name + '&wid2=cartlist&wid3=02';	//20160205 히트수파악 와이즈로그 추가(강희경대리 요청)
  //mycartLink = httpDomain + '/order/cartlist.do?_method=cartList&logintgt=cart&sid1=' + sid1Name + '&sid2=svc';
  jjimLink = httpDomain + '/gate/ZZimList.do?_method=ZZimList';
}


// 20120531_ CSS 호출위치 조정
if(document.URL.indexOf("https") > -1) {
  document.write('<link rel="stylesheet" type="text/css" href="https://www.interpark.com/gate/css/gatewayBar_ssl.css">');
} else {
  document.write('<link rel="stylesheet" type="text/css" href="http://www.interpark.com/gate/css/gatewayBar.css">');
}

var waitTimer_gate = null;

function wait_gate_showlayer(layer_id) {
  /*	if (document.getElementById(layer_id).style.display == "none"){
          waitTimer_gate = setTimeout(function(){
              gate_showlayer(layer_id);
          }, 100);
      }else{*/
  gate_showlayer(layer_id);
//	}
}

function gate_showlayer(layer_id) {
  document.getElementById(layer_id).style.display = "block"
  clearTimeout(waitTimer_gate);
  waitTimer_gate = null;
}

function wait_gate_hidelayer(layer_id) {
  /*
    if (document.getElementById(layer_id).style.display == "block"){
        waitTimer_gate = setTimeout(function(){
            gate_hidelayer(layer_id);
        }, 100);
    }else{*/
  gate_hidelayer(layer_id);
  //}
}

function gate_hidelayer(layer_id) {
  document.getElementById(layer_id).style.display = "none"
  clearTimeout(waitTimer_gate);
  waitTimer_gate = null;
}

function wait_gate_hidelayerCheck(layer_id) {
  if (document.getElementById(layer_id).style.display == "block"){
    waitTimer_kitchen = setTimeout(function(){
      gate_hidelayerCheck(layer_id);
    }, 100);
  }else{
    gate_hidelayerCheck(layer_id);
  }
}

function gate_hidelayerCheck(layer_id) {
}

/*  타임스탬프 START */
function isValid(){
  var isValid = false;
  var stampMilli = getCookie("interparkstamp");
  // 밀리세컨즈 반환
  var curTime = new Date();
  curTime = curTime.getTime();
  var stampMilli = decodeStamp(stampMilli);
  isValid = isValidStamp(stampMilli);
  return isValid;
}

function decodeStamp(str){
  if (str == null) return null;
  var decodedStr = "";
  if (str.length != 34) {
    //alert("디코딩할 문자열이 34자리가 아님.");
    return null;
  }
  for (var i = 33; i >= 0; i--) {
    decodedStr += (str.charAt(i));
  }
  decodedStr = decodedStr.substring(10, 24);
  return decodedStr;
}

function isValidStamp(stamp){
  var validDuration = 3600000;
  var milli = new Date();
  milli = milli.getTime();
  //alert("cookieStamp = " + stamp + ", now = " + milli + "\n경과시간 = "+(milli - stamp));
  if ((milli - stamp) < validDuration) {
    return true;
  } else {
    return false;
  }
}
/* 타임스탬프 END */

function setEventCookieFn( name, value, expiredays )    {
  var todayDate = new Date();
  todayDate.setDate( todayDate.getDate() + expiredays );
  document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

var getCookieMemNm = function () {
  var nm = Base64.decode(getCookieFixed("alMemNm"));
  if(nm.length>6){
    nm = nm.substring(0,6);
  }
  return nm;
}

/*
 * bug fix: "=" exists in cookie value, give wrong results. by kimsoohee
 */
var getCookieFixed = function(key){
  var cookies = document.cookie.split("; ");
  var value = null;
  $(cookies).each(function(){
    var pos = this.indexOf("=");
    if(pos>=0){
      var k = this.substring(0,pos);
      var v = this.substring(pos+1);
      //console.log("inloop2:k:[" + k + "]:v:[" + v + "]");
      if(k==key){
        value = v;
        return false;
      }
    }
  });
  return unescape(value);
}


function getGateWayBar() {
  var cate = gnbNavMenu2011;

  var imageURL = "http://openimage.interpark.com";

  if (document.URL.indexOf("https") > -1) {
    imageURL = "https://sslimage.interpark.com";
  }

  var gateBarType = function(){
    // 웰컴 스타일 게이트바
    var urlMain = [
      'interpark.com/shopping/index',
      'interpark.com/displaycorner/MorningCoffee',
      'interpark.com/displaycorner/SsenDeal',
      'interpark.com/displaycorner/dynamicPrice',
      'interpark.com/displaycorner/Sneaksoul'
    ];

    // 전문몰 게이트바
    var urlMall = [
      'free.interpark.com',
      'fashion.interpark.com',
      'shoes.interpark.com',
      'www.interpark.com/displaycorner/GarakMall',
      'kitchen.interpark.com',
      'furniture.interpark.com',
      'coffee.interpark.com',
      'junior.interpark.com',
      'interpark.com/displaycorner/ConsumerReports',
      'interpark.com/displaycorner/Local',
      'heart.interpark.com'
    ];

    // 요약몰, 딜기획전 등
    var urlSummary = 'interpark.com/display/SummaryProduct';
    var urlSummaryNo = [
      '001001',
      '001005',
      '001007',
      '001008',
      '001009'
    ];

    var urlCooperation = 'interpark.com/displaycategory/CooperationMall';
    var urlCooperationNo = '001960022';

    var urlDeal = 'interpark.com/display/deal.do';
    var urlDealNo = 'fashion';


    var urlAddress = location.href;
    var urlCheck = function(target){
      return urlAddress.indexOf(target) > -1;
    }

    var checkNo = -1;

    if(urlCheck('toy.interpark.com')){
      return 'toy';
    } else if(urlCheck(urlSummary)){
      for(var i in urlSummaryNo){
        if(urlCheck(urlSummaryNo[i])){
          return 'specialMall';
        }
      }
    } else if(urlCheck(urlCooperation) && urlCheck(urlCooperationNo)){
      return 'specialMall';
    } else if(urlCheck(urlDeal) && urlCheck(urlDealNo)){
      return 'specialMall';
    } else {
      for(var i in urlMain) {
        if(urlCheck(urlMain[i])){
          return 'welcome';
        }
      }

      for(var j in urlMall){
        if(urlCheck(urlMall[j])){
          return 'specialMall';
        }
      }
    }

  }

  var ippGatewayWarpClass = "";
  if(getCookie("ippcd").indexOf("P01423") == 0){ //IPP제휴사 삼성카드인경우 타부문 비노출
    ippGatewayWarpClass = "ippAlliance";
  }

  switch(gateBarType()){
    case 'welcome':
      var gateStr = '<div id="gateway_warp" class="welcome '+ippGatewayWarpClass+'">';
      break;
    case 'specialMall':
      var gateStr = '<div id="gateway_warp" class="specialMall '+ippGatewayWarpClass+'">';
      break;
    case 'toy':
      var gateStr = '<div id="gateway_warp" class="specialMall toy '+ippGatewayWarpClass+'">';
      break;
    default:
      var gateStr = '<div id="gateway_warp" class="'+ippGatewayWarpClass+'">';
      break;
  }
  gateStr += '		<div id="gateway_con">';
  gateStr += '			<div class="gnbArea_top">';
  gateStr += '				<div class="gnbArea_left">';
  gateStr += '					<ul>';
  gateStr += '						<li class="welcome current"><a href="http://www.interpark.com/malls/index.html?sid1=' + sid1Name + '&sid2=int">홈</a></li>';
  gateStr += '						<li class="book"><a href="http://book.interpark.com/bookPark/html/book.html?sid1=' + sid1Name + '&sid2=book">도서</a></li>';
  gateStr += '						<li class="ticket"><a href="http://ticket.interpark.com?sid1=' + sid1Name + '&sid2=ticket">티켓</a></li>';
  gateStr += '						<li class="tour"><a href="http://tour.interpark.com?sid1=' + sid1Name + '&sid2=tour">투어</a></li>';
  gateStr += '						<li class="imarket"><a href="https://incorp.interpark.com/member/extern.do?_method=imkSsoGate&reqSite=20&RETURN_URL=http%3A%2F%2Fwww.imarket.co.kr%2Fdisplay%2Fmalls.do%3F_method%3Dwelcome" target="_blank">아이마켓</a></li>';
  gateStr += '					</ul>';
  gateStr += '				</div><!-- //gnbArea_left -->';


  /* 20130322_ 박태진 수정 */
  var dg_date = new Date();
  var dg_year = dg_date.getFullYear();
  var dg_month = (dg_date.getMonth() + 1);
  if(dg_month < 10) {
    dg_month = '0' + dg_month.toString();
  }

  var dg_day = dg_date.getDate();
  var dg_hour = dg_date.getHours();
  if(dg_hour < 9) {
    dg_day = dg_day - 1;
    if(dg_day == 0) {
      dg_month = parseInt(dg_month) - 1;
      dg_month = '0' + dg_month.toString();
      if((dg_month == '01') || (dg_month == '03') || (dg_month == '05') || (dg_month == '07') || (dg_month == '08') || (dg_month == '10') || (dg_month == '12')) {
        dg_day = 31;
      } else {
        dg_day = 30;
        if((dg_month == '02') && (dg_year % 4) != 0) {
          dg_day = 28;
        } if((dg_month == '02') && (dg_year % 4) == 0) {
          dg_day = 29;
        }
      }
    }
  }
  /* 2015-05-12
      if(dg_day < 10) {
          dg_day = '0' + dg_day.toString();
      }

      var image_href = imageURL +'/_nip_ui/category_shopping/shopping_morningcoffee/gatewaybar/' + (dg_year.toString() + dg_month.toString() + dg_day.toString()) + '.jpg';
      gateStr += '			<div class="gnbArea_morningCoffee"><a href="http://www.interpark.com/displaycorner/MorningCoffee.do?_method=mainNew&sid1=' + sid1Name + '&sid2=mc&mn1=sp&mn2=gw"><img src="'+ imageURL +'/_nip_ui/category_shopping/shopping_morningcoffee/gatewaybar/null.jpg" alt="MORNING COFFEE IMAGE" style="display:none;"></a></div>';
      $(document).ready(function() {
          $('.gnbArea_morningCoffee img').error(function() {
              $(this).attr({'src':imageURL +'/_nip_ui/category_shopping/shopping_morningcoffee/gatewaybar/null.jpg'});
          }).attr({'src':image_href});

          $('.gnbArea_morningCoffee img').fadeOut(0).delay(1000).fadeIn(0);
      });
  */
  gateStr += '			<div class="gnbArea_right">';
  gateStr += '				<div id="gnbArea_link">';
  gateStr += '					<ul>';
  if( getCookie("alMemNo") != '' && getCookie("alMemNm") != '' && getCookie("tempinterparkGUEST") == '' ){ //&& location.href.indexOf("/member/login.do?_method=initial") == -1

    /* 20120706 자동로그인 by 이예지 START */
    gateStr += '						<li class="login"><a href="' + httpDomain + '/member/login.do?_method=logout&sid1=' + sid1Name + '&sid2=svc">로그아웃</a>';
    gateStr += '						<li><a href="https://incorp.interpark.com/member/memberjoin.do?_method=upMemberFront&wid1=' + wid1Name + '&wid2=Member&wid3=01">회원정보</a></li>';		//20160205 히트수파악 와이즈로그 추가(강희경대리 요청)
    //gateStr += '						<li><a href="https://incorp.interpark.com/member/memberjoin.do?_method=upMemberFront&sid1=' + sid1Name + '&sid2=svc">회원정보</a></li>';
    /* 20120706 자동로그인 by 이예지 END */

  }else{
    /* 20121017 타임스탬프 쿠키값 비교를 통해 1시간 동안 사이트 이용을 하지 않았다면, 로그아웃 -> 로그인 변경. by 최연수 */
    var isValidValue = isValid();

    if( getCookie("tempinterparkGUEST") == "" || getCookie("tempinterparkGUEST") == "logout" || getCookie("tempinterparkGUEST") == "undefined" || isValidValue == false) {
      if( location.href.indexOf("/member/login.do?_method=logout") == -1 && location.href.indexOf("/member/login.do?_method=initial") == -1 ) {
        gateStr += '						<li><a href="javascript:getHeaderLogin();">로그인</a></li>';
      }
      gateStr += '						<li><a href="https://incorp.interpark.com/member/memberjoinclause.do?_method=initial&sid1=' + sid1Name + '&sid2=svc">회원가입</a></li>';
    } else {
      if( location.href.indexOf("/member/login.do?_method=initial") == -1 ) {
        gateStr += '						<li class="login"><a href="' + httpDomain + '/member/login.do?_method=logout&sid1=' + sid1Name + '&sid2=svc">로그아웃</a></li>';
      }
      gateStr += '						<li><a href="https://incorp.interpark.com/member/memberjoin.do?_method=upMemberFront&wid1=' + wid1Name + '&wid2=Member&wid3=01">회원정보</a></li>';		//20160205 히트수파악 와이즈로그 추가(강희경대리 요청)
      //gateStr += '						<li><a href="https://incorp.interpark.com/member/memberjoin.do?_method=upMemberFront&sid1=' + sid1Name + '&sid2=svc">회원정보</a></li>';
    }
  }
  gateStr += '						<li><a href="' + mycartLink + '">장바구니</a></li>';
  gateStr += '						<li class="mypage" onMouseOver="wait_gate_showlayer(\'dlmypgsub\');" onMouseOut="wait_gate_hidelayer(\'dlmypgsub\');">';
  gateStr += '							<a href="' + httpDomain + '/mypage/common/MyPage.do?logintgt=mypage&wid1=' + wid1Name + '&wid2=mypage&wid3=03">마이페이지</a>';	//20160205 히트수파악 와이즈로그 추가(강희경대리 요청)
  //gateStr += '							<a href="' + httpDomain + '/mypage/common/MyPage.do?logintgt=mypage&sid1=' + sid1Name + '&sid2=svc">마이페이지</a>';
  gateStr += '							<div class="lay_mypgsub" id="dlmypgsub" style="display:none;" onMouseOver="gate_showlayer(\'dlmypgsub\');" onMouseOut="wait_gate_hidelayerCheck(\'dlmypgsub\');">';
  gateStr += '								<dl>';
  gateStr += '									<dd><a href="' + httpDomain + '/mypage/common/MyPage.do?logintgt=mypage&wid1=' + wid1Name + '&wid2=mypage&wid3=03">마이페이지</a></dd>';
  //gateStr += '									<dd><a href="' + httpDomain + '/mypage/common/MyPage.do?logintgt=mypage&sid1=' + sid1Name + '&sid2=svc">마이페이지</a></dd>';
  gateStr += '									<dd><a href="' + httpDomain + '/mypage/order/OrderSearchList.do?_method=initial&logintgt=mypage&sid1=' + sid1Name + '&sid2=svc">주문 / 배송조회</a></dd>';
  gateStr += '									<dd><a href="' + jjimLink + '">찜리스트</a></dd>';
  gateStr += '									<dd><a href="' + httpDomain + '/event/eventCoupon.do?_method=detailMypage&sid1=' + sid1Name + '&sid2=svc">할인쿠폰내역</a></dd>';
  gateStr += '								</dl>';
  gateStr += '							</div>';
  gateStr += '						</li>';

  var directTp = true;

  /* 바로접속 Start */
  if(getCookie("ippcd") == "undefined" || getCookie("ippcd") == "") {	// 바로 접속일 경우
    gateStr += '					<li class="last_stConnect" onMouseOver="wait_gate_showlayer(\'layer_stConnect_on\')" onMouseOut="wait_gate_hidelayer(\'layer_stConnect_on\');"><a href="#" onclick="return false;">바로접속<span>ON</span></a>';
  } else {
    if(getCookie("ippcd").indexOf("000000") == 0 || getCookie("ippcd").indexOf("P12721") == 0 || getCookie("ippcd").indexOf("P01041") == 0 || getCookie("ippcd").indexOf("P13254") == 0 || getCookie("ippcd").indexOf("P13452") == 0 || getCookie("ippcd").indexOf("P01043") == 0 || getCookie("ippcd").indexOf("P01374") == 0 || getCookie("ippcd").indexOf("A13936") == 0 || getCookie("ippcd").indexOf("A13937") == 0 || getCookie("ippcd").indexOf("A13938") == 0 || getCookie("ippcd").indexOf("A13939") == 0 || getCookie("ippcd").indexOf("A13940") == 0 || getCookie("ippcd").indexOf("P13872") == 0 || getCookie("ippcd").indexOf("P13971") == 0 || getCookie("ippcd").indexOf("A13935") == 0 || getCookie("ippcd").indexOf("A13977") == 0 || getCookie("ippcd").indexOf("A14037") == 0 || getCookie("ippcd").indexOf("A14038") == 0 || getCookie("ippcd").indexOf("A14022") == 0 || getCookie("ippcd").indexOf("A14036") == 0 ) {
      // 바로접속인 경우
      gateStr += '					<li class="last_stConnect" onMouseOver="wait_gate_showlayer(\'layer_stConnect_on\')" onMouseOut="wait_gate_hidelayer(\'layer_stConnect_on\');"><a href="#" onclick="return false;">바로접속<span>ON</span></a>';
    } else {
      gateStr += '					<li class="last_stConnect off" onMouseOver="wait_gate_showlayer(\'layer_stConnect_off\')" onMouseOut="wait_gate_hidelayer(\'layer_stConnect_off\');"><a href="#" onclick="return false;">바로접속<span>OFF</span></a>';

      directTp = false;
    }
  }
  //directTp = false;
  if(directTp) {	// 바로접속일 경우

    gateStr += '						<div id="layer_stConnect_on" class="layer_stConnect" style="display: none" onMouseOver="gate_showlayer(\'layer_stConnect_on\');" onMouseOut="wait_gate_hidelayerCheck(\'layer_stConnect_on\');">';
    gateStr += '							<ul class="stConnect_box">';
    gateStr += '								<li><img src="'+ imageURL +'/_nip/img_stConnect_top_on.gif" alt="" usemap="#stConnect_top_Map_on"></li>';
    gateStr += '								<li><img src="'+ imageURL +'/_nip/img_stConnect_01c.gif" alt=""></li>'; // 2017-05-11
    gateStr += '								<li><img src="'+ imageURL +'/_nip/img_stConnect_02a.gif" alt="" usemap="#stConnect_02_Map_off"></li>';
    gateStr += '								<li class="btn"><a href="http://incorp.interpark.com/member/MemberGoodService.do?_method=GoodServiceChk&wid1=' + wid1Name + '&wid2=right&wid3=04" target="_blank"><img src="'+ imageURL +'/_nip/bt_benefit_view.gif" alt="우수회원 혜택 보러가기"></a></li>';	//20160205 히트수파악 와이즈로그 추가(강희경대리 요청) // 2017-05-11
    //gateStr += '								<li class="btn"><a href="http://www.interpark.com/coupon/CouponAllToday.do?_method=sub6&sid1=' + sid1Name + '&sid2=direct" target="_blank"><img src="'+ imageURL +'/_nip/bt_stConnect_view.gif" alt="혜택보러가기"></a></li>';
    gateStr += '							</ul>';
    gateStr += '							<map name="stConnect_top_Map_on"><area shape="rect" alt="" coords="227,6,241,20" href="#" onClick=gate_hidelayer("layer_stConnect_on"); title="닫기"></map>';
    gateStr += '						</div>';
  } else {		// 바로접속 아닐 경우
    gateStr += '						<div id="layer_stConnect_off" class="layer_stConnect" style="display: none" onMouseOver="gate_showlayer(\'layer_stConnect_off\');" onMouseOut="wait_gate_hidelayerCheck(\'layer_stConnect_off\');">';
    gateStr += '							<ul class="stConnect_box">';
    gateStr += '								<li><img src="'+ imageURL +'/_nip/img_stConnect_top_off.gif" alt="" usemap="#stConnect_top_Map_off"></li>';
    gateStr += '								<li><img src="'+ imageURL +'/_nip/img_stConnect_01c.gif" alt=""></li>'; // 2017-05-11
    gateStr += '								<li><img src="'+ imageURL +'/_nip/img_stConnect_02a.gif" alt="" usemap="#stConnect_02_Map_off"></li>';
    gateStr += '								<li class="btn"><a href="http://incorp.interpark.com/member/MemberGoodService.do?_method=GoodServiceChk&wid1=' + wid1Name + '&wid2=right&wid3=04" target="_blank"><img src="'+ imageURL +'/_nip/bt_benefit_view.gif" alt="우수회원 혜택 보러가기"></a></li>';	//20160205 히트수파악 와이즈로그 추가(강희경대리 요청) // 2017-05-11
    //gateStr += '								<li class="btn"><a href="http://www.interpark.com/coupon/CouponAllToday.do?_method=sub6&sid1=' + sid1Name + '&sid2=direct" target="_blank"><img src="'+ imageURL +'/_nip/bt_stConnect_view.gif" alt="혜택보러가기"></a></li>';
    gateStr += '							</ul>';
    gateStr += '							<map name="stConnect_top_Map_off"><area shape="rect" alt="" coords="227,6,241,20" href="#" onClick=gate_hidelayer("layer_stConnect_off"); title="닫기"></map>';
    gateStr += '						</div>';
  }
  gateStr += '							<map name="stConnect_02_Map_off">';
  gateStr += '								<area shape="rect" alt="" coords="10,33,67,86" href="#" onClick="this.style.behavior=\'url(#default#homepage)\';this.setHomePage(\'http://www.interpark.com\'); return false" title="홈페이지 설정하기">';
  gateStr += '								<area shape="rect" alt="" coords="68,33,124,86" href="javascript:inter_bookmark();" title="즐겨찾기 추가하기">';
  gateStr += '								<area shape="rect" alt="" coords="125,33,181,86" href="javascript:copyHomePage();" title="URL직접 입력하기">';
  gateStr += '								<area shape="rect" alt="" coords="182,33,239,86" href="https://incorp.interpark.com/member/memberjoin.do" title="쇼핑메일 접속하기">';
  gateStr += '							</map>';
  gateStr += '					</li>';
  /* 바로접속 End */

  gateStr += '						<li><a href="' + httpDomain + '/ecenter/MainFAQ.do?_method=MainFAQ&wid1=' + wid1Name + '&wid2=ecenter&wid3=05">고객센터</a></li>';		//20160205 히트수파악 와이즈로그 추가(강희경대리 요청)
  //gateStr += '						<li><a href="' + httpDomain + '/ecenter/MainFAQ.do?_method=MainFAQ&sid1=' + sid1Name + '&sid2=svc">고객센터</a></li>';
  gateStr += '						<li><a href="http://ipss.interpark.com/member/login.do?_method=initial&GNBLogin=Y&wid1=' + wid1Name + '&wid2=seller&wid3=06">판매자매니저</a></li>';	//20160205 히트수파악 와이즈로그 추가(강희경대리 요청)
  //gateStr += '						<li><a href="http://ipss.interpark.com/member/login.do?_method=initial&GNBLogin=Y&sid1=' + sid1Name + '&sid2=svc">판매자매니저</a></li>';
  gateStr += '						<li class="last selectLanguage" onMouseOver="wait_gate_showlayer(\'dllngsub\');" onMouseOut="wait_gate_hidelayer(\'dllngsub\');">';
  gateStr += '							<a href="#">Language</a>';
  gateStr += '							<div id="dllngsub" style="display:none;" onMouseOver="gate_showlayer(\'dllngsub\');" onMouseOut="wait_gate_hidelayerCheck(\'dllngsub\');">';
  gateStr += '								<ul>';
  gateStr += '									<li><a href="http://www.globalinterpark.com/display/malls.do?_method=main&wid1=wgnb&wid2=Language&wid3=ENG" target="_blank" data-lang="en">English</a></li>';
  gateStr += '									<li><a href="http://www.globalinterpark.com/display/malls.do?_method=main&wid1=wgnb&wid2=Language&wid3=CHN" target="_blank" data-lang="zh-cn">Chinese</a></li>';
  gateStr += '									<li><a href="http://ticket.interpark.com/Global/index.asp?lang=en&wid1=wgnb&wid2=Language&wid3=Globalticket" target="_blank">Global Ticket</a></li>';
  gateStr += '								</ul>';
  gateStr += '							</div>';
  gateStr += '						</li>';
  gateStr += '					</ul>';
  gateStr += '				</div>';
  gateStr += '';
  gateStr += '			</div><!-- //gnbArea_right -->';
  gateStr += '		</div><!-- //gnbArea_top -->';
  gateStr += '';
  gateStr += '	</div>';
  gateStr += '</div>';

  return gateStr;
}

$(function(){
  function dgcookieCheck(){
    // http://www.interpark.com/gate/js/dg/jquery.dg.cookie.js
    if(jQuery.cookie == undefined){
      jQuery.cookie=function(d,e,b){if(arguments.length>1&&String(e)!=="[object Object]"){b=jQuery.extend({},b);if(e===null||e===undefined){b.expires=-1}if(typeof b.expires==="number"){var g=b.expires,c=b.expires=new Date();c.setDate(c.getDate()+g)}e=String(e);return(document.cookie=[encodeURIComponent(d),"=",b.raw?e:encodeURIComponent(e),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join(""))}b=e||{};var a,f=b.raw?function(h){return h}:decodeURIComponent;return(a=new RegExp("(?:^|; )"+encodeURIComponent(d)+"=([^;]*)").exec(document.cookie))?f(a[1]):null};
    }
  }
  dgcookieCheck();

  var $gotoCBTLinks = $('#dllngsub').find('a');

  $gotoCBTLinks.on('click', function(e) {
    e.preventDefault();

    var lang = $(this).data('lang');

    $.cookie('charset', lang, {
      domain: 'interpark.com',
      path: '/',
      expires: 1
    });

    window.open(this.href);
  });
});

/*
*  Base64 encode/decode
*  for auto-login (자동로그인)
*/
var Base64 = {

  // private property
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  // public method for encoding
  encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {

      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

    }

    return output;
  },

  // public method for decoding
  decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }

    output = Base64._utf8_decode(output);

    return output;

  },

  // private method for UTF-8 encoding
  _utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }

    return utftext;
  },

  // private method for UTF-8 decoding
  _utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }
      else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }

    }

    return string;
  }



}

// 고객 등급 조회
var getMemGrd = function(){
  var _gGrade = "";
  switch(getCookie("g_memGrd")) {
    case '13':
      _gGrade = 'VVIP';
      break;
    case '12':
      _gGrade = 'VIP';
      break;
    case '11':
      _gGrade = 'FAMILY';
      break;
    case '01':
      _gGrade = 'WELCOME';
      break;
    default:
      break;
  }
  return _gGrade;
}

//구글 태깅 데이타 https://www.googletagmanager.com
var dataLayer;

;(function($){

  getGATagDate = function(){
    return new Date();
  }

  getGATagDataInfo = function(type){
    var _gSex = '';
    var _gAge = '';
    var _gGrade = '';

    var M_BirthYear = getCookie('M_BirthYear');
    if(M_BirthYear.length == 3 && !isNaN(M_BirthYear)){
      _gSex = M_BirthYear.substring(2,3);
      var birthYear = 1900;
      if(_gSex == 1 || _gSex == 2 || _gSex == 5 || _gSex == 6 ){
        birthYear = birthYear + Number(M_BirthYear.substring(0,2));
      }else if(_gSex == 3 || _gSex == 4 || _gSex == 7 || _gSex == 8 ){
        birthYear = 2000 + Number(M_BirthYear.substring(0,2));
      }else if(_gSex == 9 || _gSex == 0){
        birthYear = 1800 + Number(M_BirthYear.substring(0,2));
      }
      var _gDate = new Date(this.getGATagDate());
      _gAge = _gDate.getFullYear()-birthYear;
      _gAge = '0A'+_gAge+'P';


      if( _gSex != null && _gSex != undefined && _gSex != '' ){
        _gSex = ( _gSex%2 == 0 ) ? 2 : 1;
      }
    }

    if(type == 'age'){
      return _gAge;
    }else if(type == 'sex'){
      return _gSex;
    }else if(type == 'grade'){
      return getMemGrd();
    }else{
      return "";
    }
  }

  var categoryObject = {
    '/displaycorner/SsenDeal.do' : '쎈딜'
    ,'/pet/home.do' : '펫'
    ,'/pet/display.do' : '펫'
    ,'/display/sellerAllProduct.do' : 'SELLEREVENT'
    ,'/mypage/common/MyPage.do' : 'Mypage'
    ,'/ecenter/MainFAQ.do' : '고객센터'
    ,'/member/login.do' : '로그인'
  };

  var categoryName = categoryObject[document.location.pathname];
  categoryName = (categoryName != undefined && categoryName != null) ? categoryName : "";

  dataLayer = [{
    'uid' : getCookie('tempinterparkGUEST'),
    'CD1' : getCookie('tempinterparkGUEST'),
    'CD2' : getGATagDataInfo('sex'),
    'CD3' : getGATagDataInfo('age'),
    'CD5' : getGATagDataInfo('grade'),
    'CD17' : '쇼핑',
    'CD18' : categoryName,
    'CD19' : 'PC_Web',
    'CD20' : categoryName
  }];


  $(document).ready(function(){
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',"GTM-W8799HK");
  });

})(jQuery);


var facebookPixelCode = {
    getMemGrd : function(){
      var _gGrade = "";
      switch(getCookie("g_memGrd")) {
        case '13':
          _gGrade = 'VVIP';
          break;
        case '12':
          _gGrade = 'VIP';
          break;
        case '11':
          _gGrade = 'FAMILY';
          break;
        case '01':
          _gGrade = 'WELCOME';
          break;
        default:
          break;
      }
      return _gGrade;
    }
  }


;(function(doc,win,$){
  checkIEVersion = function(){
    var msie;
    if(navigator.appName == "Microsoft Internet Explorer") { //IE
      var ver = navigator.userAgent;
      var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})"); //version
      if (re.exec(ver) != null ){
        msie = parseFloat(RegExp.$1);
        if( !msie || msie <= 8){ //IE 8이하이면 리턴
          return -1;
        }
      }
      /*
           *
           *호환성보기
              X: ie7 -> 7, ie8 -> 8, ie9 -> 9, ie10 -> 10, ie11 -> -1
             O:ie7,ie8,ie9,ie10,ie11 -> 7

             따라서 추가적으로 trident 값을 체크해야함.
             4.0 -> 8,5.0 -> 9,6.0 -> 10,7.0 -> 11
           *
           */
      var trident = navigator.userAgent.match(/Trident\/(\d)/i);
      if(trident==null || trident[1] < 6){ // 버전 10 이하
        return -1;
      }

    }
    return 1;
  }


  //ie


  if(checkIEVersion() <= -1){
    var _fbInterParkId;
    win.fbq = function(tr, ev, obj){
      if( (tr === undefined || tr === null) && (ev === undefined || ev === null) ){
        return false;
      }
      if(tr === 'init'){
        _fbInterParkId = ev;
      }else{
        if( !_fbInterParkId ){
          return false;
        }
        try{
          var _fbParamArray = [];
          _fbParamArray.push("id="+_fbInterParkId);
          _fbParamArray.push("ev="+ev);
          for( var prop in obj){
            var value = obj[ prop ];
            var encValue = encodeURIComponent(value);
            if( obj[ prop ] instanceof Array ){
              _fbParamArray.push( "cd["+prop+"]"+"=["+encValue+"]" );
            }else{
              _fbParamArray.push( "cd["+prop+"]"+"="+encValue );
            }
          }
          var _fbParam = _fbParamArray.join('&');
          var _fbEvtUrl = 'https://www.facebook.com/tr?'+_fbParam;
          var _fbImg = doc.createElement("img");
          _fbImg.setAttribute("src", _fbEvtUrl);
          _fbImg.setAttribute("style", "display:none");
          _fbImg.setAttribute("height", "2");
          _fbImg.setAttribute("width", "1");
          doc.getElementsByTagName("body")[0].appendChild(_fbImg);
        }catch(e){

        }
      }
    }
  }else {
    !function(f,b,e,v)
    {
      if(f.fbq) return;

      n=f.fbq=function(){
        n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)
      };
      if(!f._fbq) f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];
      t=b.createElement(e);
      t.async=!0;
      t.src=v;
      s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)

    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  }



})(document, window,jQuery);

$(document).ready(function(){
  fbq('init', '1368896999886986');
  fbq('track', 'PageView',{
    member_category: facebookPixelCode.getMemGrd()
  })
});




document.write(getGateWayBar());
