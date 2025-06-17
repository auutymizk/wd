const axios = require('axios');

async function withdraw() {
  const payload = {
    member: "637e8caa1078072d7e58dabf",
    memberDevice: "mobile",
    memberIp: "0.0.0.0",
    credit: "2500",
    memberBankAccount: "637e8caa1078072d7e58dac8"
  };

  try {
    const res = await axios.post(
      'https://mapi.som777.com/api/withdrawRequest/newWithdrawRequest?website=som777.com',
      payload,
      {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2U4Y2FhMTA3ODA3MmQ3ZTU4ZGFiZiIsInVzZXJuYW1lIjoiUFQ3Nzc3MjQzNDcxIiwid2ViR3JvdXAiOiJzb203NzcuY29tIiwibGV2ZWwiOiJtZW1iZXIiLCJzdXNwZW5kIjoibm8iLCJsb2NrIjoibm8iLCJpc0Zha2UiOmZhbHNlLCJpYXQiOjE3NTAxNTE2NjUsImV4cCI6MTc1Mjc0MzY2NX0.98XozirsAmcsCp94LlUpkyH-baZ4I4NYLslMlov-sWc',
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'Origin': 'https://www.som777.com',
          'Referer': 'https://www.som777.com/',
        }
      }
    );
    console.log("✅ ถอนเงินสำเร็จ:", res.data);
  } catch (err) {
    console.error("❌ ถอนเงินล้มเหลว:", err.response ? err.response.data : err.message);
  }
}

function scheduleWithdraw() {
  const now = new Date();
  const next = new Date();
  next.setHours(1, 30, 0, 0);
  if (now > next) next.setDate(next.getDate() + 1);
  const ms = next.getTime() - now.getTime();
  console.log(`⏳ รอจนถึง ${next} เพื่อถอน`);

  setTimeout(() => {
    withdraw();
    setInterval(withdraw, 24 * 60 * 60 * 1000);
  }, ms);
}

scheduleWithdraw();
