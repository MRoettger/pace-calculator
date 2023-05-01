import inquirer from "inquirer";
import fs from "fs";
/**
 * Simple Calculater for Running prediction with TS/Js
 */
raceCal();
//main function
function raceCal() {
    //start promt question
    inquirer
        .prompt([
        {
            name: "time",
            message: "How fast do you want to run per km?",
            default: "03:50",
        },
    ])
        //processes the answers
        .then((answers) => {
        var time_seconds = get_seconds(answers);
        //create new variable with the timings
        var data = `Time per km: ${toHHMMSS(time_seconds)} ` +
            "\nSimple Time Calulater: \n" +
            `
      Speed: ${((1000 / time_seconds) * 3.6).toFixed(2)} km/h
      400m time: ${toHHMMSS(time_seconds / 2.5)}
      5k time: ${toHHMMSS(time_seconds * 5)}
      10k time: ${toHHMMSS(time_seconds * 10)}
      21,0975k time: ${toHHMMSS(time_seconds * 21.0975)}
      25k time:${toHHMMSS(time_seconds * 25)}
      42,195k time: ${toHHMMSS(time_seconds * 42.195)} \n
      `;
        console.info(data);
        //print new file txt with the timings
        fs.writeFileSync(`time_prediction/${toHHMMSS(time_seconds)}_Pace.txt`, data);
        raceCal();
    });
}
function get_seconds(answers) {
    var timeArray = answers.time.split(":");
    var time = Number(timeArray[0]) * 60;
    time += Number(timeArray[1]);
    return time;
}
function toHHMMSS(sec_num) {
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = Math.round(sec_num % 60);
    return [hours, minutes, seconds]
        .map((v) => (v < 10 ? "0" + v : v))
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");
}
