import React, { useState } from "react";
import logo from "../../assets/Mai _Logo.png";
import GPay from "../../assets/Upi Paymt/google-pay.jpg";
import Phonepe from "../../assets/Upi Paymt/Phonepe.png";
import Paytm from "../../assets/Upi Paymt/Paytm_Logo.jpg";
const PaymentComponent = () => {
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);

  // ==========================================
  // PAYMENT DETAILS
  // ==========================================
  const paymentDetails = {
    upiId: "9319284073-2@ybl",
    name: "Vikas Vikas",

    bankName: "State Bank of India (SBI)",
    accountNumber: "43149760305",
    ifsc: "SBIN0036805",
    Branch: "Shalimar Garden, Ghaziabad"
  };

  // ==========================================
  // VALIDATE AMOUNT
  // ==========================================
  const getAmount = () => {
    const value = Number(amount);

    if (!value || value <= 0) {
      alert("Please enter a valid amount.");
      return null;
    }

    return value.toFixed(2);
  };

  // ==========================================
  // UPI URL
  // ==========================================
  const createUPIUrl = () => {
    const paymentAmount = getAmount();

    if (!paymentAmount) return null;

    return (
      `upi://pay?pa=${encodeURIComponent(paymentDetails.upiId)}` +
      `&pn=${encodeURIComponent(paymentDetails.name)}` +
      `&am=${paymentAmount}` +
      `&cu=INR`
    );
  };

  // ==========================================
  // GOOGLE PAY
  // ==========================================
  const payWithGooglePay = () => {
    const paymentAmount = getAmount();

    if (!paymentAmount) return;

    const params =
      `pa=${encodeURIComponent(paymentDetails.upiId)}` +
      `&pn=${encodeURIComponent(paymentDetails.name)}` +
      `&am=${paymentAmount}` +
      `&cu=INR`;

    window.location.href = `tez://upi/pay?${params}`;
  };

  // ==========================================
  // PHONEPE
  // ==========================================
  const payWithPhonePe = () => {
    const paymentAmount = getAmount();

    if (!paymentAmount) return;

    const params =
      `pa=${encodeURIComponent(paymentDetails.upiId)}` +
      `&pn=${encodeURIComponent(paymentDetails.name)}` +
      `&am=${paymentAmount}` +
      `&cu=INR`;

    window.location.href = `phonepe://pay?${params}`;
  };

  // ==========================================
  // PAYTM
  // ==========================================
  const payWithPaytm = () => {
    const paymentAmount = getAmount();

    if (!paymentAmount) return;

    const params =
      `pa=${encodeURIComponent(paymentDetails.upiId)}` +
      `&pn=${encodeURIComponent(paymentDetails.name)}` +
      `&am=${paymentAmount}` +
      `&cu=INR`;

    window.location.href = `paytmmp://pay?${params}`;
  };

  // ==========================================
  // ANY UPI
  // ==========================================
  const payWithAnyUPI = () => {
    const upiUrl = createUPIUrl();

    if (!upiUrl) return;

    window.location.href = upiUrl;
  };

  // ==========================================
  // COPY UPI
  // ==========================================
  const copyUPI = async () => {
    try {
      await navigator.clipboard.writeText(paymentDetails.upiId);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  // ==========================================
  // QR CODE
  // ==========================================
  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=10&data=" +
    encodeURIComponent(
      `upi://pay?pa=${paymentDetails.upiId}&pn=${paymentDetails.name}&cu=INR`
    );

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#fffdf8] px-3 py-5 sm:px-6 sm:py-7 lg:px-8">

      {/* ======================================
          BACKGROUND
      ====================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(#c98b08 0.7px, transparent 0.7px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[#d9a52e]/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#d9a52e]/10 blur-3xl" />

      </div>

      {/* ======================================
          MAIN CONTAINER
      ====================================== */}
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-[24px] border border-[#ddc88f]/50 bg-white shadow-[0_15px_50px_rgba(90,65,15,0.10)] lg:grid-cols-[0.9fr_1.1fr]">

          {/* ======================================
              LEFT SIDE
          ====================================== */}
          <div className="relative overflow-hidden bg-[#171512] px-6 py-7 text-white sm:px-8 sm:py-8 lg:px-10 lg:py-9">

            {/* Gold Top Line */}
            <div className="absolute left-0 top-0 h-1 w-full bg-[#c98b08]" />

            {/* Decorative Circle */}
            <div className="absolute -bottom-28 -left-28 h-64 w-64 rounded-full border border-[#c98b08]/10" />

            <div className="relative z-10">

              {/* ==================================
                  BRAND
              ================================== */}
              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fffff] font-bold text-white">
              <img
  src={logo}
  alt="Elevion Media"
  className="h-10 w-auto object-contain"
/>
                </div>

                <div>
                  <h2 className="text-base font-bold sm:text-lg">
                    Elevion Media
                  </h2>

                  <p className="text-[10px] text-white/45 sm:text-xs">
                    Creative & Digital Solutions
                  </p>
                </div>

              </div>

              {/* ==================================
                  LABEL
              ================================== */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c98b08]/50 bg-[#c98b08]/10 px-3 py-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-[#d9a52e]" />

                <span className="text-[10px] font-semibold tracking-[0.15em] text-[#e2b54b]">
                  SECURE PAYMENT
                </span>

              </div>

              {/* ==================================
                  HEADING
              ================================== */}
              <h1 className="max-w-md text-[30px] font-bold leading-[1.08] tracking-tight sm:text-[36px] lg:text-[40px]">

                Complete Your

                <span className="block text-[#d9a52e]">
                  Payment Securely
                </span>

              </h1>

              <p className="mt-4 max-w-md text-xs leading-6 text-white/55 sm:text-sm">
                Enter your payment amount and choose your preferred UPI
                application to complete your payment quickly and securely.
              </p>

              {/* Divider */}
              <div className="mt-5 flex items-center gap-3">

                <div className="h-px w-14 bg-[#c98b08]" />

                <span className="text-xs text-[#d9a52e]">
                  ✦
                </span>

                <div className="h-px w-14 bg-[#c98b08]" />

              </div>

              {/* ==================================
                  QR SECTION
              ================================== */}
              <div className="mt-6 flex flex-col items-center rounded-2xl border border-[#c98b08]/20 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:gap-5 lg:mt-7">

                {/* QR */}
                <div className="shrink-0 rounded-xl bg-white p-2">

                  <img
                    src={qrUrl}
                    alt="UPI Payment QR"
                    className="h-[155px] w-[155px] sm:h-[165px] sm:w-[165px]"
                  />

                </div>

                {/* QR INFO */}
                <div className="mt-4 text-center sm:mt-0 sm:text-left">

                  <p className="text-sm font-bold text-white">
                    Scan & Pay
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-white/45">
                    Scan this QR using any UPI application.
                  </p>

                  <p className="mt-3 text-xs font-semibold text-[#d9a52e]">
                    {paymentDetails.name}
                  </p>

                  <p className="mt-1 break-all text-[10px] text-white/40">
                    {paymentDetails.upiId}
                  </p>

                </div>

              </div>

            </div>

            {/* ==================================
                BOTTOM INFO
            ================================== */}
            <div className="relative z-10 mt-6 border-t border-white/10 pt-5">

              <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                Payment Options
              </p>

              <p className="mt-1.5 text-xs text-white/60">
                Google Pay • PhonePe • Paytm • UPI
              </p>

            </div>

          </div>

          {/* ======================================
              RIGHT SIDE
          ====================================== */}
          <div className="min-w-0 bg-[#fffefa] px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">

            {/* ==================================
                HEADER
            ================================== */}
            <div className="mb-5">

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b77c00]">
                PAYMENT
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#171512] sm:text-3xl">
                Enter Payment Amount
              </h2>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Select your preferred payment method.
              </p>

            </div>

            {/* ==================================
                AMOUNT
            ================================== */}
            <div className="mb-4">

              <label className="mb-2 block text-xs font-semibold text-[#33302b]">
                Amount
              </label>

              <div className="flex h-[60px] items-center rounded-xl border border-[#d8c49a] bg-white px-4 transition focus-within:border-[#c98b08]">

                <span className="text-xl font-bold text-[#b77c00]">
                  ₹
                </span>

                <input
                  type="number"
                  min="1"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="min-w-0 w-full bg-transparent px-3 text-xl font-bold text-[#171512] outline-none placeholder:text-gray-300"
                />

              </div>

            </div>

            {/* ==================================
                UPI ID
            ================================== */}
            <div className="mb-4 rounded-xl border border-[#dec994] bg-[#fffaf0] p-4">

              <div className="flex items-center gap-3">

                <div className="min-w-0 flex-1">

                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#a77a18]">
                    UPI ID
                  </p>

                  <p className="mt-1 break-all text-xs font-semibold text-[#171512] sm:text-sm">
                    {paymentDetails.upiId}
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500">
                    {paymentDetails.name}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={copyUPI}
                  className="shrink-0 rounded-lg border border-[#d8bd7c] bg-white px-3 py-2 text-[10px] font-semibold text-[#8f640e] hover:border-[#c98b08]"
                >
                  {copied ? "Copied" : "Copy"}
                </button>

              </div>

            </div>

            {/* ==================================
                PAYMENT BUTTONS
            ================================== */}
            <div className="space-y-2.5">

              {/* GOOGLE PAY */}
              <button
                type="button"
                onClick={payWithGooglePay}
                className="group flex min-h-[55px] w-full items-center justify-between rounded-xl border border-[#ded6c5] bg-white px-4 text-left font-semibold transition hover:border-[#c98b08] hover:bg-[#fffaf0]"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 font-bold">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center">
  <img
    src={GPay}
    alt="Google Pay"
    className="h-9 w-9 object-contain"
  />
</div>
                  </div>

                  <span className="truncate text-xs sm:text-sm">
                    Pay with Google Pay
                  </span>

                </div>

                <span className="text-[#b77c00]">
                  →
                </span>

              </button>

              {/* PHONEPE */}
              <button
                type="button"
                onClick={payWithPhonePe}
                className="group flex min-h-[55px] w-full items-center justify-between rounded-xl border border-[#ded6c5] bg-white px-4 text-left font-semibold transition hover:border-[#c98b08] hover:bg-[#fffaf0]"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e1d4f5] bg-[#f8f3ff] text-sm font-bold text-[#6739b7]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center">
  <img
    src={Phonepe}
    alt="PhonePe"
    className="h-9 w-9 object-contain"
  />
</div>
                  </div>

                  <span className="truncate text-xs sm:text-sm">
                    Pay with PhonePe
                  </span>

                </div>

                <span className="text-[#b77c00]">
                  →
                </span>

              </button>

              {/* PAYTM */}
              <button
                type="button"
                onClick={payWithPaytm}
                className="group flex min-h-[55px] w-full items-center justify-between rounded-xl border border-[#ded6c5] bg-white px-4 text-left font-semibold transition hover:border-[#c98b08] hover:bg-[#fffaf0]"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#cdeafa] bg-[#f1fbff] text-sm font-bold text-[#00a8df]">
                   <div className="flex h-10 w-10 shrink-0 items-center justify-center">
  <img
    src={Paytm}
    alt="Paytm"
    className="h-9 w-9 object-contain"
  />
</div>
                  </div>

                  <span className="truncate text-xs sm:text-sm">
                    Pay with Paytm
                  </span>

                </div>

                <span className="text-[#b77c00]">
                  →
                </span>

              </button>

              {/* ANY UPI */}
              <button
                type="button"
                onClick={payWithAnyUPI}
                className="flex min-h-[55px] w-full items-center justify-center gap-2 rounded-xl bg-[#c98b08] px-4 text-sm font-bold text-white transition hover:bg-[#b77b00] active:scale-[0.98]"
              >
                Pay with Any UPI App →
              </button>

            </div>

            <p className="mt-2 text-center text-[9px] text-gray-400">
              UPI app must be installed on your mobile device.
            </p>

            {/* ==================================
                BANK DETAILS
            ================================== */}
            <div className="mt-5">

              <div className="mb-3 flex items-center gap-2">

                <div className="h-px flex-1 bg-[#e5dccb]" />

                <span className="text-[9px] font-bold uppercase tracking-wider text-[#a77a18]">
                  Bank Transfer
                </span>

                <div className="h-px flex-1 bg-[#e5dccb]" />

              </div>

              <div className="rounded-xl border border-[#dec994] bg-white p-4">

                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#a77a18]">
                  Bank Details
                </p>

                <div className="space-y-2.5">

                  <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#f0eadf] pb-2.5">
                    <span className="text-xs text-gray-500">
                      Account Holder
                    </span>

                    <span className="max-w-[190px] break-words text-right text-xs font-semibold text-[#171512]">
                      {paymentDetails.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#f0eadf] pb-2.5">
                    <span className="text-xs text-gray-500">
                      Bank
                    </span>

                    <span className="max-w-[190px] break-words text-right text-xs font-semibold text-[#171512]">
                      {paymentDetails.bankName}
                    </span>
                  </div>

                  <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#f0eadf] pb-2.5">
                    <span className="text-xs text-gray-500">
                      Account Number
                    </span>

                    <span className="max-w-[190px] break-all text-right text-xs font-semibold text-[#171512]">
                      {paymentDetails.accountNumber}
                    </span>
                  </div>

                  <div className="grid grid-cols-[1fr_auto] gap-4">
                    <span className="text-xs text-gray-500">
                      IFSC
                    </span>

                    <span className="max-w-[190px] break-all text-right text-xs font-semibold text-[#171512]">
                      {paymentDetails.ifsc}
                    </span>
                  </div>

                </div>

              </div>

            </div>

            <p className="mt-4 text-center text-[9px] leading-4 text-gray-400">
              Please verify the payment details before making a bank transfer.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default PaymentComponent;