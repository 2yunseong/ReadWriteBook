// 공연료 청구서를 출력하는 코드
// invoice : 공연료 청구서에 들어갈 데이터
// plays : 공연할 연극 정보

const invoice = {
    "customer": "yunseong",
    "performances": [
        {
            "playID": "hamlet",
            "audience": 55
        },
        {
            "playID": "as-like",
            "audience": 35
        },
        {
            "playID": "othello",
            "audience": 45
        }
    ]
};

const plays = {
"hamlet": {"name": "hamlet", "type":"tragedy"},
"as-like": {"name": "As you like it", "type":"comedy"},
"othello": {"name": "Othello", "type":"tragedy"}
};

function playFor(performances){
    return plays[performances.playID];
}

function amountFor(perf){
    let thisAmount = 0;
    switch(playFor(perf).type){
        case "tragedy":
            thisAmount = 40000;
            if(perf.audience > 30){
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if(perf.audience > 20){
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`알수 없는 장르 : ${playFor(perf).type}`);
    } 
    return thisAmount;
}

function statement(invoice, plays){
let totalAmount = 0;  // 총 금액
let volumeCredits = 0; // 포인트

let result = `청구내역: (고객명: ${invoice.customer})\n`;
const format = new Intl.NumberFormat("en-US", {
    style:"currency",
    currency: "USD",
    minimumFractionDigits: 2
}).format;

for(let perf of invoice.performances){
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트 제공
    if("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

        // 청구 내역 출력
result += `${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}석)\n`;
totalAmount += amountFor(perf);
}
result += `총액: ${format(totalAmount/100)}\n`;
result += `적립 포인트: ${volumeCredits}점\n`;
return result;
}

console.log(statement(invoice, plays));