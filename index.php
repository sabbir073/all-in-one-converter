<?php
require_once("header.php");
?>

<div class="container">
    <div id="content">

        <h3>Unit Converter</h3>
        <div id="menu">
            <h2>Unit Converter, Temperature Converter, Weight Converter, Time Converter, Length Converter, Area
                Converter, Volume Converter</h2>
        </div>
        <script>
        popMenu("Length");
        currentAName = lA;
        </script>
        <div id="qcvt">
            <table width="600" border="0" align="center" style="padding-top:5px;">
                <form name="calForm">
                    <tr>
                        <td width="300"><b>From:</b></td>
                        <td width="300"><b>To:</b></td>
                    </tr>
                    <tr>
                        <td><input type="text" name="fromVal" onKeyUp="calcul();" class="ucinput" style="width:98%;"
                                autofocus></td>
                        <td><input type="text" name="toVal" style="width:98%;"
                                class="ucinput" readonly></td>
                    </tr>
                    <tr>
                        <td style="padding-top:8px;"><select name="calFrom" id="calFrom" onChange="calcul();" size="11"
                                class="ucselect" style="width:98%;"></select></td>
                        <td style="padding-top:8px;"><select name="calTo" id="calTo" size="11" onChange="calcul();"
                                class="ucselect" style="width:98%;"></select></td>
                    </tr>
                </form>
            </table>
            <br>
            <div id="calResults"></div>
        </div>
    </div>
</div>

    <?php

require_once("footer.php");