<?php

include_once("header.php");

?>

<div class="container" style="padding: 0px">
<center>
<h3>Bangla Font Converter</h3>
    <!-- Unicode Converter Start -->
    <script type="text/javascript">
    (function($) {
        $(window).load(function() {
            $.getScript('js/con_.js');
            $.getScript('js/rcon_.js');
            $.getScript('js/com_.js');
            $.getScript('js/lay_.js');
        });
    })(jQuery);
    </script>
    <!-- <script src="files/common.js"></script>
            <script src="files/converter.js"></script>
            <script src="files/rconverter.js"></script>
            <script src="files/layout.js"></script> -->
    <script>
    var en = "eZ";
    var t = "bangla";
    var aH = false;
    var aY;
    var aA = aY;

    function co() {
        for (var dX in aA) {
            var as = document.getElementById(dX);
            if (as.type == "button") {
                as.value = aA[dX];
            } else {
                as.innerHTML = aA[dX];
            }
        }
    };

    function ax(lang) {
        var as;
        if (lang == 1) {
            aA = cH;
            as = document.getElementById("cI");
            as.innerHTML = "English";
            as = document.getElementById("cR");
            as.innerHTML = "<a href=\"javascript:ax(2);\">.....</a>";
        } else if (lang == 2) {
            aA = aY;
            as = document.getElementById("cI");
            as.innerHTML = "<a href=\"javascript:ax(1);\">English</a>";
            as = document.getElementById("cR");
            as.innerHTML = ".....";
        }
        co();
    };

    function ak(eO) {
        if (eO == 1) {
            cA("aN");
            cw("ct");
            cA("cq");
            aH = true;
        } else {
            cw("aN");
            cw("cq");
            cA("ct");
            aH = false;
        }
    };

    function A() {
        var g = document.getElementsByName('M');
        var bK = document.getElementById("aN");
        if (o == aG || al == true) g[0].checked = true;
        else if (o > 2) g[o - 2].checked = true;
        if (o == cx) bK.innerHTML = af("bangla");
        else if (o == by) bK.innerHTML = af("unijoy");
        else if (o == cz) bK.innerHTML = af("probhat");
        else if (o == aT) bK.innerHTML = af("somewherein");
        else if (o == ap) bK.innerHTML = af("avro");
        else if (o == at) bK.innerHTML = af("bornosoft");
        if (o == aG || al == true) cw("aN");
        else if (aH == true) {
            cA("aN");
            av(document.getElementById("CharacteMapTable"), aB, aj);
        }
    };

    function dH() {
        var g = document.getElementsByName('O');
        if (t == "bangla") {
            g[0].checked = true;
        } else if (t == "somewherein") {
            g[1].checked = true;
        } else if (t == "boisakhi") {
            g[2].checked = true;
        } else if (t == "bangsee") {
            g[3].checked = true;
        } else if (t == "bornosoft") {
            g[4].checked = true;
        } else if (t == "phonetic") {
            g[5].checked = true;
        } else if (t == "htmlsafehex") {
            g[6].checked = true;
        } else if (t == "htmlsafedec") {
            g[7].checked = true;
        }
    };

    function I(event) {
        var g = document.getElementsByName('M');
        for (var ae = 0; ae < g.length; ae++) {
            if (g[ae].checked) {
                al = false;
                if (ae) o = ae + 2;
                else o = ae + 1;
                A();
                var cV = document.getElementById(en);
                cV.focus();
                break;
            }
        }
    };

    function ck(ec) {
        var w = document.getElementById(ec).value;
        w = cM(t, w);
        ag(document.getElementById(en), w);
    };

    function cB(ec) {
        var w = document.getElementById(en).value;
        w = cX(t, w);
        ag(document.getElementById(ec), w);
    };

    function dh(eN) {
        var ee = document.getElementById(eN);
        ee.value = "";
        ee.focus();
    };

    function aL() {
        var g = document.getElementsByName('O');
        var J = document.getElementById('bm');
        if (t == "bangla") {
            J.style.fontFamily = "SutonnyMJ";
            J.style.width = 400;
            g[0].checked = true;
        } else if (t == "somewherein") {
            J.style.fontFamily = "SushreeMJ";
            J.style.width = 400;
            g[1].checked = true;
        } else if (t == "boisakhi") {
            J.style.fontFamily = "Boishakhi";
            J.style.width = 400;
            g[2].checked = true;
        } else if (t == "bangsee") {
            J.style.fontFamily = "Bangsee Alpona";
            J.style.width = 400;
            g[3].checked = true;
        } else if (t == "bornosoft") {
            J.style.fontFamily = "Falgun";
            J.style.width = 400;
            g[4].checked = true;
        } else if (t == "phonetic") {
            J.style.fontFamily = "Times New Roman";
            J.style.width = 400;
            g[5].checked = true;
        } else if (t == "htmlsafehex" || t == "htmlsafedec") {
            J.style.fontFamily = "Times New Roman";
            J.style.width = 400;
            g[6].checked = true;
        }
    };

    function P(event) {
        var g = document.getElementsByName('O');
        for (var ae = 0; ae < g.length; ae++) {
            if (g[ae].checked) {
                if (ae == 0) t = "bangla";
                else if (ae == 1) t = "somewherein";
                else if (ae == 2) t = "boisakhi";
                else if (ae == 3) t = "bangsee";
                else if (ae == 4) t = "bornosoft";
                else if (ae == 5) t = "phonetic";
                else if (ae == 6) t = "htmlsafehex";
                else if (ae == 7) t = "htmlsafedec";
                break;
            }
        }
        aL();
    };

    function dG() {
        var cp = 90;
        if (aA == cH) aq(L + "language", "english", cp, "font-converter.php", "");
        if (aA == aY) aq(L + "language", "bangla", cp, "font-converter.php", "");
        aq(L + "layout", o, cp, "font-converter.php", "");
        aq(L + "converter", t, cp, "font-converter.php", "");
        aq(L + "showhelp", aH, cp, "font-converter.php", "");
    };

    function dE() {
        var ez = aw(L + "language");
        if (ez == "english") ax(1);
        else ax(2);
        o = aw(L + "layout");
        if (o == null) o = 2;
        t = aw(L + "converter");
        if (t == null) t = "bangla";
        var eC = aw(L + "showhelp");
        if (eC == "true") ak(1);
        else ak(2);
    };

    function eE() {
        aI(L + "language", "font-converter.php", "");
        aI(L + "layout", "font-converter.php", "");
        aI(L + "converter", "font-converter.php", "");
        aI(L + "showhelp", "font-converter.php", "");
    };

    function dZ() {
        dE();
        A();
        aL();
        var cV = document.getElementById(en);
        var bU = document.getElementById("dD");
        if (eJ) {
            bU.innerHTML =
                "If you can't see Bangla, please download Unicode Bangla Font <a href=fonts/SutonnyBanglaOMJ.ttf>from here</a>.";
            cV.style.fontFamily = "SutonnyBanglaOMJ";
        } else {
            bU.innerHTML =
                "If you can't see Bangla, please download Unicode Bangla Font <a href=fonts/SutonnyBanglaOMJ.ttf>from here</a>.";
            cV.style.fontFamily = "SutonnyBanglaOMJ";
        }
        cV.style.width = 400;
        var J = document.getElementById('bm');
        J.style.width = 400;
        di();
    };

    function dk() {
        dG();
    }
    </script>
    <script type="text/javascript">
    function clearContent(idtxt) {
        var elem = document.getElementById(idtxt);
        elem.value = '';
        elem.focus();
    }

    function insertContent(field, text) {
        if (document.selection) {
            field.focus();
            sel = document.selection.createRange();
            sel.text = text;
            sel.collapse(true);
            sel.select();
        } else if (field.selectionStart || field.selectionStart == '0') {
            var startPos = field.selectionStart;
            var endPos = field.selectionEnd;
            var scrollTop = field.scrollTop;
            startPos = (startPos == -1 ? field.value.length : startPos);
            field.value = field.value.substring(0, startPos) + text + field.value.substring(endPos, field.value.length);
            field.focus();
            field.selectionStart = startPos + text.length;
            field.selectionEnd = startPos + text.length;
            field.scrollTop = scrollTop;
        } else {
            var scrollTop = field.scrollTop;
            field.value += value;
            field.focus();
            field.scrollTop = scrollTop;
        }
    }
    </script>
    <script>
    function updates(bm) {
        var str = document.getElementById('bm').value;
        var res = str.replace(/  /g, " ");
        var res = res.replace(/šÔ/g, "š‘");
        var res = res.replace(/ ‡/g, " †");
        var res = res.replace(/¯Õ/g, "¯’v");
        var res = res.replace(/ÓQ/g, "”Q");
        var res = res.replace(/¯—/g, "¯Í");
        var res = res.replace(/¯-/g, "¯Í");
        var res = res.replace(/š—/g, "šÍ");
        var res = res.replace(/š-/g, "šÍ");
        var res = res.replace(/Ê/g, "Ð");
        var res = res.replace(/¯'/g, "¯’");
        var res = res.replace(/`ª“/g, "`ªæ");
        var res = res.replace(/y/g, "z");
        var res = res.replace(/«/g, "Ö");
        var res = res.replace(/“/g, "æ");
        var res = res.replace(/ ‰/g, " ˆ");
        var res = res.replace(/~/g, "‚");
        document.getElementById('bm').value = res;
        alert('Done...');
    }

    function update(eZ) {
        var str = document.getElementById('eZ').value;
        var res = str.replace(/š‘/g, "ন্তু");
        var res = res.replace(/র্যাব/g, "র‌্যাব");
        var res = res.replace(/র্যাবে/g, "র‌্যাবে");
        var res = res.replace(/¯’া/g, "স্থা");
        var res = res.replace(/”েছ/g, "চ্ছে");
        var res = res.replace(/¯’/g, "স্থ");
        var res = res.replace(/র“/g, "রু");
        var res = res.replace(/¯’্য/g, "স্থ্য");
        var res = res.replace(/¯্রা/g, "স্রা");
        var res = res.replace(/¤œা/g, "ম্না");
        var res = res.replace(/¤œ/g, "ম্ন");
        var res = res.replace(/ত্র“/g, "ত্রু");
        var res = res.replace(/তœ/g, "ত্ন");
        var res = res.replace(/শ^া/g, "শ্বা");
        var res = res.replace(/Ñ/g, "-");
        document.getElementById('eZ').value = res;
        alert('Done...');
    }
    </script>
    <div class="clear" style="margin: 0 0 15px 0"></div>
    <div style="margin: 10px">
        <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12" style="padding: 0px">
            <textarea onkeypress="return dg(event);" id="eZ" name="eZ" onkeydown="return dn(event);"
                class="textarearight persisted-text" name="index2"
                placeholder="ইন্টারনেট থেকে কপি করা/ ইউনিকোড লেখা এখানে পেস্ট করুন"
                style="width: 100%; height: 250px; margin: 0 0 0 0; padding: 5px; font-size: 18px; font-family: Solaimanlipi;"></textarea>
            <div class="bn-text" style="margin: 10px 0; height:30px">
                শুভ সকাল কনভার্টারে শব্দ ভাঙে না। তবুও আপনার পিসিতে শব্দ ভাঙলে info@shuvoshokal.com ঠিকানায় ই-মেইল করুন।
            </div>
            <!-- <img border="0" src="files/unicode-box.jpg" width="130" height="18"> -->
            <div class="bn">ইউনিকোড ভাঙ্গা শব্দ ঠিক করতে <input style="margin: 10px 0; height:30px; cursor: pointer"
                    class="bn" value=" ক্লিক " onclick="update()" type="button"> করুন</div>
            <div class="clear"></div>
            <input id="db" name="ea" value="ইউনিকোড থেকে বিজয়" onclick="cB('bm');" type="button"
                class="unicode_button button_custom_style">
            <input id="dc" onclick="ck('bm');" value="বিজয় থেকে ইউনিকোড" name="eF" type="button"
                class="bijoy_button button_custom_style">
            <input onclick="clearContent('bm'); clearContent('eZ');" value="বক্স ক্লিয়ার করুন" type="button"
                class="reset_button button_custom_style">
            <input type="button" value="ইউনিকোড লেখা কপি" class="copy_unicode button_custom_style">
            <input type="button" value="বিজয় লেখা কপি" class="copy_bijoy button_custom_style">
            <!-- <input onclick="clearContent('bm');" value="Clear Left" type="button">
                  <input onclick="clearContent('eZ');" value="Clear Right" type="button">	 -->
            <div class="clear" style="margin: 0 0 15px 0"></div>
            <textarea id="bm" name="bm" class="textarealeft persisted-text" name="index1"
                placeholder="বিজয় কি-বোর্ডের লেখা এখানে পেস্ট করুন"
                style="width: 100%; height: 250px; margin: 0 0 0 0; padding: 5px; font-size: 18px; font-family: SutonnyMJ"></textarea>
            <!-- <img border="0" src="files/bijoy-box.jpg" width="100" height="18"> -->
            <div class="bn">বিজয় ভাঙ্গা শব্দ ঠিক করতে <input style=" margin: 10px 0; height: 30px; cursor: pointer"
                    class="bn" type="button" value=" ক্লিক " onclick="updates()"> করুন</div>

            <div class="clear"></div>
        </div>

    </div>
    <script type="text/javascript">
    var copyTextareaBtn = document.querySelector(".copy_unicode");
    copyTextareaBtn.addEventListener("click", function(e) {
        document.querySelector(".textarearight").select(), document.execCommand("copy") && (alert(
            "Unicode Copy Successful"), $temp.remove())
    });
    var copyTextareaBtns = document.querySelector(".copy_bijoy");
    copyTextareaBtns.addEventListener("click", function(e) {
        document.querySelector(".textarealeft").select(), document.execCommand("copy") && (alert(
            "Bijoy Copy Successful"), $temp.remove())
    });
    </script>
    <center>
</div>


<?php


include_once("footer.php");