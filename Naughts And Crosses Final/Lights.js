//hue values for common colours
var red = 65535;
var green = 25500;
var blue = 46920;

function TurnOff1(LightID){
    var cmdLight = {"on": false}
    var URI = "http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/" + LightID + "/state/";

    console.log(cmdLight);
    console.log(URI);
}

function LightOffall(){
    LightOffall(1),
        LightOffall(2),
        LightOffall(3),
        LightOffall(4),
        LightOffall(5),
        LightOffall(6)
}

function TurnOn1(LightID, lightcolour) {
    var cmdLight = {"on" : true, "hue": (lightcolour), "bri":250};
    var URI =  "http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/" + LightID + "/state/";

    console.log(cmdLight);
    console.log(URI);
}

$.ajax({
    url: URI,
    type: "PUT",
    data: JSON.stringify(cmdLight)
})

function WinOn(){
    TurnOn1(1, green),
        TurnOn1(2, green),
        TurnOn1(3, green),
        TurnOn1(4, green),
        TurnOn1(5, green),
        TurnOn1(6, green)
}

function LoseOn(){
    TurnOn1(1, red),
        TurnOn1(2, red),
        TurnOn1(3, red),
        TurnOn1(4, red),
        TurnOn1(5, red),
        TurnOn1(6, red)

}

function DrawOn(){
    WinOn();
    LoseOn();
    LightOffall();
}