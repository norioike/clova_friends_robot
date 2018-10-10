var Obniz = require("obniz");

exports.handler = function (event, context, callback) {
  console.log("リクエストを受信しました")
  console.log(JSON.stringify({ event: event, context: context }, null, 2));

  //Jsonで送られてきたIDとアクションをパースする
  var obnizID = event.ID
  var actionCode = event.action
  var startDelay = parseInt(event.delay)

  console.log('送られてきたID')
  console.log(obnizID)
  console.log('action code')
  console.log(actionCode)

  callback(null, "success");
  var obniz = new Obniz(obnizID);
  obniz.onconnect = async function () {
    var rightArm = obniz.wired("ServoMotor", { signal: 2, vcc: 1, gnd: 0 });
    var leftArm = obniz.wired("ServoMotor", { signal: 11, vcc: 10, gnd: 9 });
    let initialPosition = 90;
    var raiseAngle = 75;
    var dropAngle = 45;
    let rightUp = initialPosition + raiseAngle;
    let rightDrop = initialPosition - dropAngle;
    let leftUp = initialPosition - raiseAngle;
    let leftDrop = initialPosition + dropAngle;

    obniz.display.clear();
    obniz.display.print("Running robot API");

        //startDelay
     await obniz.wait(startDelay);
    switch (actionCode) {
      case 'start':
        obniz.display.clear();
        obniz.display.print("Start motion");
        let smallMotion = 40;
        rightArm.angle(rightUp);
        leftArm.angle(leftUp);
        await obniz.wait(200);
        rightArm.angle(rightUp - smallMotion);
        leftArm.angle(leftUp + smallMotion);
        await obniz.wait(200);
        rightArm.angle(rightUp);
        leftArm.angle(leftUp);
        await obniz.wait(200);
        rightArm.angle(rightUp - smallMotion);
        leftArm.angle(leftUp + smallMotion);
        await obniz.wait(200);
        rightArm.angle(rightUp);
        leftArm.angle(leftUp);
        await obniz.wait(200);
        rightArm.angle(rightUp - smallMotion);
        leftArm.angle(leftUp + smallMotion);
        break;
      case 'raiseRight':
        obniz.display.clear();
        obniz.display.print("Raise right hand");
        rightArm.angle(rightUp);
        leftArm.angle(leftDrop);
        break;
      case 'raiseLeft':
        obniz.display.clear();
        obniz.display.print("Raise left hand");
        rightArm.angle(rightDrop);
        leftArm.angle(leftUp);
        break;
      case 'dropHand':
        obniz.display.clear();
        obniz.display.print("Drop both hand");
        rightArm.angle(rightDrop);
        leftArm.angle(leftDrop);
        break;
      case 'raiseBoth':
        obniz.display.clear();
        obniz.display.print("Raise both hand");
        rightArm.angle(rightUp);
        leftArm.angle(leftUp);
        break;
      case 'Rage':
        obniz.display.clear();
        obniz.display.print("Rage motion");
        rightArm.angle(rightUp);
        leftArm.angle(leftDrop);
        await obniz.wait(250);
        rightArm.angle(rightDrop);
        leftArm.angle(leftUp);
        await obniz.wait(250);
        rightArm.angle(rightUp);
        leftArm.angle(leftDrop);
        await obniz.wait(250);
        rightArm.angle(rightDrop);
        leftArm.angle(leftUp);
        await obniz.wait(250);
        rightArm.angle(rightUp);
        leftArm.angle(leftDrop);
        await obniz.wait(250);
        rightArm.angle(rightDrop);
        leftArm.angle(leftUp);
        await obniz.wait(250);
        leftArm.angle(leftDrop);
        break;
      case 'Happy':
        obniz.display.clear();
        obniz.display.print("Happy motion");
        rightArm.angle(rightUp);
        leftArm.angle(leftUp);
        await obniz.wait(600);
        rightArm.angle(rightDrop);
        leftArm.angle(leftDrop);
        await obniz.wait(200);
        rightArm.angle(rightUp);
        leftArm.angle(leftUp);
        await obniz.wait(600);
        rightArm.angle(rightDrop);
        leftArm.angle(leftDrop);
        await obniz.wait(200);
        rightArm.angle(rightUp);
        leftArm.angle(leftUp);
        await obniz.wait(600);
        rightArm.angle(rightDrop);
        leftArm.angle(leftDrop);
        await obniz.wait(200);
        rightArm.angle(rightUp);
        leftArm.angle(leftUp);
        break;
      case 'Bye':
        obniz.display.clear();
        obniz.display.print("Good-bye motion");
        var smallByeMotion = 30;
        rightArm.angle(rightDrop);
        leftArm.angle(leftUp - smallByeMotion);
        await obniz.wait(300);
        leftArm.angle(leftUp + smallByeMotion);
        await obniz.wait(300);
        leftArm.angle(leftUp - smallByeMotion);
        await obniz.wait(300);
        leftArm.angle(leftUp + smallByeMotion);
        await obniz.wait(300);
        leftArm.angle(leftUp - smallByeMotion);
        break;
      case 'Initial':
        obniz.display.clear();
        obniz.display.print("Set Initial position");
        rightArm.angle(initialPosition);
        leftArm.angle(initialPosition);
        break;
      default:
        obniz.display.print("Didn't catch action code");
        break;
    }

    await obniz.wait(200);//これがないと、close()が動いてしまい、最後のサーボモータ処理が動かない(動くけどすぐ止まってしまう)。
    obniz.close();
    // callback(null, "success");
  };
};