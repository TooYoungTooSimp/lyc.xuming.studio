$(function () {
    $.get("/api/poem?rnd=" + Date.now() + Math.random(), function (data) {
        $('#poem').text(data);
    });
    (function () {
        var targetDate = new Date("2018-06-07");
        var cFactor = 24 * 60 * 60 * 1000;
        $("#textLive h3").each(function (idx) {
            var element = this;
            var txtDate = element.innerText;
            var curDate = new Date([txtDate.slice(0, 4), txtDate.slice(4, 6), txtDate.slice(6, 8)].join("-"));
            element.innerText = [
                curDate.getFullYear(), " 年 ", curDate.getMonth() + 1, " 月 ", curDate.getDate(), " 日 ",
                "星期", ["日", "一", "二", "三", "四", "五", "六"][curDate.getDay()], "， ",
                "离高考还有 ", (targetDate - curDate) / cFactor, " 天"
            ].join("");
        });
    }());
    $.getJSON("scores.json?rnd=" + Date.now() + Math.random(), function (rawScore) {
        testNames = [], ranks = [], scores = [];
        [0, 1].forEach(function (i) {
            ranks[i] = [];
        });
        [0, 1, 2, 3, 4, 5].forEach(function (i) {
            scores[i] = [];
        });
        rawScore.forEach(function (singleTest) {
            testNames.push(singleTest[0]);
            [0, 1].forEach(function (i) {
                ranks[i].push(singleTest[1][i]);
            });
            [0, 1, 2, 3, 4, 5].forEach(function (i) {
                scores[i].push(singleTest[2][i])
            });
        });
        var scoreChart = new Chart("scoreChart", {
            type: "line",
            data: {
                labels: testNames,
                datasets: [
                    {
                        fill: false,
                        label: "语文",
                        data: scores[0],
                        yAxisID: "y150",
                        borderColor: "red",
                        backgroundColor: "red"
                    },
                    {
                        fill: false,
                        label: "数学",
                        data: scores[1],
                        yAxisID: "y150",
                        borderColor: "green",
                        backgroundColor: "green"
                    },
                    {
                        fill: false,
                        label: "英语",
                        data: scores[2],
                        yAxisID: "y150",
                        borderColor: "pink",
                        backgroundColor: "pink"
                    },
                    {
                        fill: false,
                        label: "物理",
                        data: scores[3],
                        yAxisID: "y110",
                        borderColor: "Cyan",
                        backgroundColor: "Cyan"
                    },
                    {
                        fill: false,
                        label: "化学",
                        data: scores[4],
                        yAxisID: "y100",
                        borderColor: "purple",
                        backgroundColor: "purple"
                    },
                    {
                        fill: false,
                        label: "生物",
                        data: scores[5],
                        yAxisID: "y90",
                        borderColor: "Chartreuse",
                        backgroundColor: "Chartreuse"
                    },
                    {
                        fill: false,
                        label: "班级排名",
                        data: ranks[0],
                        yAxisID: "yRankC",
                        borderColor: "black",
                        backgroundColor: "black"
                    },
                    {
                        fill: false,
                        label: "年级排名",
                        data: ranks[1],
                        yAxisID: "yRankG",
                        borderColor: "DimGray",
                        backgroundColor: "DimGray"
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            id: "y150",
                            type: "linear",
                            display: false,
                            ticks: {
                                max: 150,
                                min: 90
                            }
                        },
                        {
                            id: "y110",
                            type: "linear",
                            display: false,
                            ticks: {
                                max: 110,
                                min: 66
                            }
                        },
                        {
                            id: "y100",
                            type: "linear",
                            display: false,
                            ticks: {
                                max: 100,
                                min: 60
                            }
                        },
                        {
                            id: "y90",
                            type: "linear",
                            display: false,
                            ticks: {
                                max: 90,
                                min: 54
                            }
                        },
                        {
                            id: "yCorrectness",
                            type: "linear",
                            position: "left",
                            ticks: {
                                max: 100,
                                min: 60,
                                stepSize: 5
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "正确率"
                            }
                        },
                        {
                            id: "yRankC",
                            type: "linear",
                            position: "right",
                            ticks: {
                                max: 40,
                                min: 0,
                                reverse: true
                            }
                        },
                        {
                            id: "yRankG",
                            type: "linear",
                            position: "right",
                            ticks: {
                                max: 800,
                                min: 0,
                                reverse: true
                            }
                        }
                    ]
                }
            }
        });
    });
});
