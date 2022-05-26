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

function volumeCreditsFor(perf){
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트 제공
    if("comedy" === playFor(perf).type)
        result += Math.floor(perf.audience / 5);
    return result;
}

function usd(number) {
    return new Intl.NumberFormat("en-US", {
        style:"currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format(number/100);
}

function statement(invoice, plays){

let result = `청구내역: (고객명: ${invoice.customer})\n`;

let totalAmount = 0;  // 총 금액
for(let perf of invoice.performances){
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
}

let volumeCredits = 0; // 포인트
for(let perf of invoice.performances){
    volumeCredits = volumeCreditsFor(perf);
}

result += `총액: ${usd(totalAmount)}\n`;
result += `적립 포인트: ${volumeCredits}점\n`;
return result;
}

console.log(statement(invoice, plays));