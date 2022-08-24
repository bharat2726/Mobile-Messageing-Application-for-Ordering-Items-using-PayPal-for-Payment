const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    CONTAINER: Symbol("container"),
    CLEANER: Symbol("cleaner"),
    BULB: Symbol("bulb"),
    EXTRAS: Symbol("extras")
});

module.exports = class LockDownEssentials extends Order {
    constructor(sNumber, sUrl) {
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sContainer = "";
        this.sCleaner = "";
        this.sBulb = "";
        this.sExtra = "";
        this.sSubTotal = 0;
    }
    handleInput(sInput) {
        let aReturn = [];
        let aTotal = 0;
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.CONTAINER;
                aReturn.push("Welcome to Bharat's Hardware Store.");
                aReturn.push(`For a list of what we sell tap:`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                aReturn.push("Please type 'BD' if you want 'Brooms and Dustbins' or 'GRC' if you want 'Garbage and Recycling Containers'.");
                break;
            case OrderState.CONTAINER:
                this.stateCur = OrderState.CLEANER;
                if (sInput.toLowerCase() == "bd") {
                    this.sContainer = "Brooms and Dustbin";
                    this.sSubTotal += 4.99;
                }
                else if (sInput.toLowerCase() == "grc") {
                    this.sContainer = "Garbage and Recycling Containers";
                    this.sSubTotal += 2.99;
                }
                else {
                    this.stateCur = OrderState.CONTAINER;
                    aReturn.push("Please type 'BD' if you want 'Brooms and Dustbins' or 'GRC' if you want 'Garbage and Recycling Containers'.");
                    break;
                }
                console.log(`Container = ${this.sContainer}`);
                aReturn.push("Would you like Snow Shovels or Household Cleaners? If you want 'Snow Shovels' type 'SS' else type 'HC' for 'Household Cleaners' and if you don't want anything type 'NO'?");
                break;
            case OrderState.CLEANER:
                this.stateCur = OrderState.BULB;
                if (sInput.toLowerCase() == "ss") {
                    this.sCleaner = "Snow Shovels";
                    this.sSubTotal += 3.99;
                }
                else if (sInput.toLowerCase() == "hc") {
                    this.sCleaner = "Household Cleaners";
                    this.sSubTotal += 5.99;
                }
                else if (sInput.toLowerCase() == "no") {
                    this.sCleaner = "";
                }
                else {
                    this.stateCur = OrderState.CLEANER;
                    aReturn.push("Invalid Input! Please type 'SS' if you want 'Snow Shovels' or 'HC' if you want 'Household Cleaners' or 'NO' if you don't want this item.");
                    break;
                }
                console.log(`Cleaner = ${this.sCleaner}`);
                aReturn.push("Would you like Light Bulbs as well? If you want 'Light Bulbs' type 'LB' and if you don't want this item type 'NO'?");
                break;
            case OrderState.BULB:
                this.stateCur = OrderState.EXTRAS
                if (sInput.toLowerCase() == "lb") {
                    this.sBulb = "Light Bulbs";
                    this.sSubTotal += 2.55;
                }
                else if (sInput.toLowerCase() == "no") {
                    this.sBulb = "";
                }
                else {
                    this.stateCur = OrderState.BULB;
                    aReturn.push("Invalid Input! Please type 'LB' if you want 'Light Bulbs' or 'NO' if you don't want this item.");
                    break;
                }
                console.log(`Bulb = ${this.sBulb}`);
                aReturn.push("Would you like a 'Simonize Car Cloth' or 'Geeky Headlamps' or 'Ear buds' or 'De-scalar for a kettle'? If you want 'Simonize Car Cloth' type 'SCC' or 'Geeky Headlamps' type 'GH' or 'Ear buds' type 'EB' or 'De-scalar for a kettle' type 'DK' else NO if you don't want anything.");
                break;
            case OrderState.EXTRAS:
                if (sInput.toLowerCase() == "scc") {
                    this.sExtra = "Simonize Car Cloth";
                    this.sSubTotal += 2.99;
                }
                else if (sInput.toLowerCase() == "gh") {
                    this.sExtra = "Geeky Headlamp";
                    this.sSubTotal += 2.99;
                }
                else if (sInput.toLowerCase() == "eb") {
                    this.sExtra = "Ear buds";
                    this.sSubTotal += 2.99;
                }
                else if (sInput.toLowerCase() == "dk") {
                    this.sExtra = "De-scalar for a kettle";
                    this.sSubTotal += 2.99;
                }
                else if (sInput.toLowerCase() == "no") {
                    this.sExtra = "";
                }
                else{
                    this.stateCur = OrderState.EXTRAS;
                    aReturn.push("Invalid Input! Would you like a 'Simonize Car Cloth' or 'Geeky Headlamps' or 'Ear buds' or 'De-scalar for a kettle'? If you want 'Simonize Car Cloth' type 'SCC' or 'Geeky Headlamps' type 'GH' or 'Ear buds' type 'EB' or 'De-scalar for a kettle' type 'DK' else NO if you don't want anything.");
                    break;
                }
                console.log(`Extra = ${this.sExtra}`);
                aReturn.push("Thank-you for your order of:");
                aReturn.push(`- ${this.sContainer}`);
                if (this.sCleaner != "")
                    aReturn.push(`- ${this.sCleaner}`);
                if (this.sBulb != "")
                    aReturn.push(`- ${this.sBulb}`);
                if (this.sExtra != "")
                    aReturn.push(`- ${this.sExtra}`);

                aTotal = this.sSubTotal + this.sSubTotal*0.13;
                console.log(`Subtotal = ${this.sSubTotal} || Total = ${aTotal.toFixed(2)}`);
                aReturn.push(`Your total comes to ${aTotal.toFixed(2)}(including 13% tax)`);
                aReturn.push(`We will text you from 519-222-2222 when your order is ready or if we have questions.`)
                this.isDone(true);
                break;
        }
        return aReturn;
    }
    renderForm() {
        // your client id should be kept private
        return (`
        <html>

        <head>
            <meta content="text/html; charset=UTF-8" http-equiv="content-type">
            <style type="text/css">
                ol {
                    margin: 0;
                    padding: 0
                }
        
                table td,
                table th {
                    padding: 0
                }
        
                .c3 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 243pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c9 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 225pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c16 {
                    margin-left: 6pt;
                    padding-top: 4pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: left;
                    margin-right: 56pt
                }
        
                .c14 {
                    color: #000000;
                    font-weight: 700;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 32pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c10 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 11pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c1 {
                    margin-left: 6pt;
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: right
                }
        
                .c23 {
                    padding-top: 12pt;
                    padding-bottom: 12pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: left;
                    height: 11pt
                }
        
                .c26 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 10pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c0 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 26pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c2 {
                    margin-left: 9pt;
                    padding-top: 3pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .c27 {
                    color: #000000;
                    font-weight: 700;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 18pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c12 {
                    color: #000000;
                    font-weight: 700;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 11pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c17 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 18pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c24 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 5.5pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c7 {
                    color: #000000;
                    font-weight: 700;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 21pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c11 {
                    margin-left: 6pt;
                    padding-top: 3pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: right
                }
        
                .c18 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .c4 {
                    padding-top: 0pt;
                    padding-bottom: 12pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: center
                }
        
                .c8 {
                    padding-top: 0pt;
                    padding-bottom: 12pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .c21 {
                    border-spacing: 0;
                    border-collapse: collapse;
                    margin-right: auto
                }
        
                .c22 {
                    background-color: #ffffff;
                    max-width: 468pt;
                    padding: 72pt 72pt 72pt 72pt
                }
        
                .c15 {
                    height: 45.2pt
                }
        
                .c25 {
                    height: 11pt
                }
        
                .c19 {
                    height: 75.2pt
                }
        
                .c5 {
                    height: 73pt
                }
        
                .c20 {
                    font-size: 26pt
                }
        
                .c13 {
                    font-size: 36pt
                }
        
                .c6 {
                    margin-right: 38pt
                }
        
                .title {
                    padding-top: 0pt;
                    color: #000000;
                    font-size: 26pt;
                    padding-bottom: 3pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .subtitle {
                    padding-top: 0pt;
                    color: #666666;
                    font-size: 15pt;
                    padding-bottom: 16pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                li {
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial"
                }
        
                p {
                    margin: 0;
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial"
                }
        
                h1 {
                    padding-top: 20pt;
                    color: #000000;
                    font-size: 20pt;
                    padding-bottom: 6pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h2 {
                    padding-top: 18pt;
                    color: #000000;
                    font-size: 16pt;
                    padding-bottom: 6pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h3 {
                    padding-top: 16pt;
                    color: #434343;
                    font-size: 14pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h4 {
                    padding-top: 14pt;
                    color: #666666;
                    font-size: 12pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h5 {
                    padding-top: 12pt;
                    color: #666666;
                    font-size: 11pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h6 {
                    padding-top: 12pt;
                    color: #666666;
                    font-size: 11pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    font-style: italic;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
            </style>
        </head>
        
        <body class="c22">
            <p class="c4"><span class="c14">HARDWARE STORE</span></p>
            <p class="c4 c25"><span class="c14"></span></p>
            <p class="c8"><span class="c7">For curbside pickup:</span></p>
            <p class="c18"><span class="c20">Text &ldquo;BD for (Brooms and Dustbins)&rdquo; or &ldquo;GRC for (Garbage and
                    Recycling Containers)&rdquo; to </span><span class="c13">519-111-1111</span></p>
            <p class="c8"><span class="c24">&nbsp;</span></p><a id="t.7d620dd877cd3404968cd8307525c437cf38f6a7"></a><a
                id="t.0"></a>
            <table class="c21">
                <tr class="c15">
                    <td class="c3" colspan="1" rowspan="1">
                        <p class="c2"><span class="c0">Brooms and Dustbin(BD)</span></p>
                    </td>
                    <td class="c9" colspan="1" rowspan="1">
                        <p class="c1"><span class="c0">4.99</span></p>
                    </td>
                </tr>
                <tr class="c5">
                    <td class="c3" colspan="1" rowspan="1">
                        <p class="c2"><span class="c0">Garbage and Recycling Containers(GRC)</span></p>
                    </td>
                    <td class="c9" colspan="1" rowspan="1">
                        <p class="c11"><span class="c0">2.99</span></p>
                    </td>
                </tr>
                <tr class="c15">
                    <td class="c3" colspan="1" rowspan="1">
                        <p class="c2"><span class="c0">Snow Shovels(SS)</span></p>
                    </td>
                    <td class="c9" colspan="1" rowspan="1">
                        <p class="c1"><span class="c0">3.99</span></p>
                    </td>
                </tr>
                <tr class="c5">
                    <td class="c3" colspan="1" rowspan="1">
                        <p class="c2 c6"><span class="c0">Household Cleaners(HC)</span></p>
                    </td>
                    <td class="c9" colspan="1" rowspan="1">
                        <p class="c1"><span class="c0">5.99</span></p>
                    </td>
                </tr>
                <tr class="c19">
                    <td class="c3" colspan="1" rowspan="1">
                        <p class="c2 c6"><span class="c0">Light Bulbs(LB)</span></p>
                    </td>
                    <td class="c9" colspan="1" rowspan="1">
                        <p class="c1"><span class="c0">2.55</span></p>
                    </td>
                </tr>
            </table>
            <p class="c16"><span class="c12">&nbsp;</span></p>
            <p class="c16"><span class="c27">ADDITIONAL IEMS AVAILABLE:</span></p>
            <p class="c16"><span class="c17">We also have a selection of &lsquo;simonize car cloths(SCC)&rsquo;, &lsquo;geeky
                    headlamps(GH)&rsquo;, &lsquo;ear buds(EB)&rsquo;, &lsquo;de-scalar for a kettle(DK)&rsquo;. (Any from these will cost
                    2.99)</span></p>
            <p class="c23"><span class="c10"></span></p>
            <p class="c18 c25"><span class="c10"></span></p>
        </body>
        
        </html>`);

    }
}
