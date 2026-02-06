import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ROIResults {
  hoursSaved: number;
  laborSavings: number;
  errorSavings: number;
  discountSavings: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  monthsToPayback: number;
  firstYearROI: number;
}

export function ROICalculator() {
  const [invoiceCount, setInvoiceCount] = useState<number>(100);
  const [results, setResults] = useState<ROIResults | null>(null);
  const [showTooSmall, setShowTooSmall] = useState(false);

  // ROI Calculation Logic
  const calculateROI = (count: number): ROIResults => {
    // Time calculations
    const minutesPerInvoiceManual = 18;
    const minutesPerInvoiceAutomated = 1.2;
    const hoursCurrently = (count * minutesPerInvoiceManual) / 60;
    const hoursWithVeyra = (count * minutesPerInvoiceAutomated) / 60;
    const hoursSaved = hoursCurrently - hoursWithVeyra;
    
    // Labor savings
    const hourlyRate = 35;
    const laborSavings = hoursSaved * hourlyRate;
    
    // Error reduction
    const errorRate = 0.023;
    const avgErrorCost = 485;
    const errorsPerMonth = count * errorRate;
    const errorSavings = errorsPerMonth * avgErrorCost * 0.85;
    
    // Early payment discounts
    const percentEligible = 0.3;
    const avgInvoiceValue = 2500;
    const discountRate = 0.02;
    const captureImprovement = 0.75;
    const discountSavings = count * percentEligible * avgInvoiceValue * discountRate * captureImprovement;
    
    // Totals
    const totalMonthlySavings = laborSavings + errorSavings + discountSavings;
    const totalAnnualSavings = totalMonthlySavings * 12;
    
    // ROI Calculations
    const setupFee = 10000;
    const monthlyFee = 3000;
    const firstYearCost = setupFee + (monthlyFee * 12);
    const monthsToPayback = totalMonthlySavings > monthlyFee ? Math.ceil(setupFee / (totalMonthlySavings - monthlyFee)) : 999;
    const firstYearROI = firstYearCost > 0 ? Math.round(((totalAnnualSavings - firstYearCost) / firstYearCost) * 100) : 0;
    
    return {
      hoursSaved: Math.round(hoursSaved),
      laborSavings: Math.round(laborSavings),
      errorSavings: Math.round(errorSavings),
      discountSavings: Math.round(discountSavings),
      totalMonthlySavings: Math.round(totalMonthlySavings),
      totalAnnualSavings: Math.round(totalAnnualSavings),
      monthsToPayback: monthsToPayback,
      firstYearROI: firstYearROI
    };
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setInvoiceCount(value);
    updateCalculator(value);
  };

  const updateCalculator = (count: number) => {
    if (count >= 100) {
      setResults(calculateROI(count));
      setShowTooSmall(false);
    } else {
      setResults(null);
      setShowTooSmall(true);
    }
  };
  
  const handleQuickSelect = (count: number) => {
    setInvoiceCount(count);
    updateCalculator(count);
  };

  // Initial calculation on mount
  useEffect(() => {
    updateCalculator(100);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const getGradientPercent = () => {
    return ((invoiceCount - 0) / (2000 - 0)) * 100;
  };

  return (
    <div id="calculator" className="w-full max-w-[1000px] mx-auto px-5 py-20 bg-slate-50">
      <div className="text-center mb-10">
        <h2 className="text-slate-900 text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Calculate Your Monthly Savings
        </h2>
        <p className="text-slate-500 text-xl">
          See your exact ROI based on your invoice volume
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        
        {/* Slider Section */}
        <div className="mb-12">
          <label className="block text-slate-800 text-xl mb-8 font-semibold text-center">
            How many invoices do you process monthly?
          </label>
          
          {/* Invoice Count Display */}
          <div className="text-center mb-8">
            <span className="text-6xl md:text-7xl font-bold text-slate-900 leading-none">{invoiceCount.toLocaleString()}</span>
            <span className="text-xl md:text-2xl text-slate-500 ml-3">invoices/month</span>
          </div>
          
          {/* Slider Container */}
          <div className="relative px-5 mb-8">
            <input 
              type="range" 
              min="0" 
              max="2000" 
              value={invoiceCount}
              step="10"
              onChange={handleSliderChange}
              className="w-full h-2 rounded-lg outline-none appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #10B981 0%, #10B981 ${getGradientPercent()}%, #E2E8F0 ${getGradientPercent()}%, #E2E8F0 100%)`
              }}
            />
            <style>{`
              input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: linear-gradient(135deg, #10B981 0%, #059669 100%);
                cursor: pointer;
                box-shadow: 0 2px 10px rgba(16, 185, 129, 0.4);
                transition: all 0.2s;
              }
              input[type=range]::-webkit-slider-thumb:hover {
                transform: scale(1.2);
                box-shadow: 0 2px 15px rgba(16, 185, 129, 0.6);
              }
              input[type=range]::-moz-range-thumb {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: linear-gradient(135deg, #10B981 0%, #059669 100%);
                cursor: pointer;
                border: none;
                box-shadow: 0 2px 10px rgba(16, 185, 129, 0.4);
              }
            `}</style>
            
            {/* Scale Markers */}
            <div className="flex justify-between mt-4 text-sm text-slate-400 font-medium">
              <span>0</span>
              <span>500</span>
              <span>1000</span>
              <span>1500</span>
              <span>2000+</span>
            </div>
          </div>
          
          {/* Quick Select Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[100, 250, 500, 1000, 2000].map((count) => (
              <button 
                key={count}
                onClick={() => handleQuickSelect(count)}
                className={`
                  px-5 py-2 border-2 rounded-lg text-base font-medium transition-all duration-200
                  ${invoiceCount === count 
                    ? 'border-emerald-500 text-emerald-600 bg-emerald-50' 
                    : 'border-slate-200 bg-white text-slate-500 hover:border-emerald-500 hover:text-emerald-500 hover:-translate-y-0.5'
                  }
                `}
              >
                {count === 2000 ? '2000+' : count}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {results && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {/* Visual Progress Bars */}
              <div className="mb-10 space-y-6">
                {/* Hours Saved Bar */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-500 text-sm font-medium">Hours Saved Monthly</span>
                    <span className="text-slate-900 text-lg font-bold">{results.hoursSaved.toLocaleString()} hrs</span>
                  </div>
                  <div className="bg-slate-200 h-3 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-emerald-600 to-slate-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((results.hoursSaved / 500) * 100, 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                {/* Labor Savings Bar */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-500 text-sm font-medium">Labor Cost Savings</span>
                    <span className="text-slate-900 text-lg font-bold">{formatCurrency(results.laborSavings)}</span>
                  </div>
                  <div className="bg-slate-200 h-3 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((results.laborSavings / 20000) * 100, 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                {/* Error Reduction Bar */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-500 text-sm font-medium">Error Reduction Value</span>
                    <span className="text-slate-900 text-lg font-bold">{formatCurrency(results.errorSavings)}</span>
                  </div>
                  <div className="bg-slate-200 h-3 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((results.errorSavings / 20000) * 100, 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                {/* Discount Capture Bar */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-500 text-sm font-medium">Early Payment Discounts</span>
                    <span className="text-slate-900 text-lg font-bold">{formatCurrency(results.discountSavings)}</span>
                  </div>
                  <div className="bg-slate-200 h-3 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((results.discountSavings / 20000) * 100, 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Total Savings Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-700 text-white p-10 rounded-2xl text-center mb-8 relative overflow-hidden shadow-xl">
                 {/* Background Pattern */}
                 <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute -top-[50%] -right-[10%] w-[300px] h-[300px] rounded-full border-2 border-white"></div>
                    <div className="absolute -bottom-[30%] -left-[10%] w-[250px] h-[250px] rounded-full border-2 border-white"></div>
                  </div>

                <div className="relative z-10">
                  <div className="text-base font-medium tracking-widest uppercase opacity-90 mb-4">Total Monthly Savings</div>
                  <div className="text-6xl md:text-7xl font-bold mb-2 tracking-tight">{formatCurrency(results.totalMonthlySavings)}</div>
                  <div className="text-xl md:text-2xl opacity-90 mb-8">{formatCurrency(results.totalAnnualSavings)} annually</div>
                  
                  {/* ROI Metrics */}
                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/20">
                    <div>
                      <div className="text-3xl md:text-4xl font-bold mb-1">
                        {results.monthsToPayback < 24 ? results.monthsToPayback : '—'}
                      </div>
                      <div className="text-sm opacity-80 font-medium">Month Payback</div>
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-bold mb-1">
                        {results.firstYearROI > 0 ? `${results.firstYearROI}%` : '—'}
                      </div>
                      <div className="text-sm opacity-80 font-medium">First Year ROI</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA Section */}
              <div className="text-center">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(16, 185, 129, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-none py-5 px-12 text-xl font-semibold rounded-full cursor-pointer shadow-[0_10px_30px_rgba(16,185,129,0.3)] transition-all inline-flex items-center gap-2"
                >
                  Get Your Full ROI Analysis <ArrowRight className="w-6 h-6" />
                </motion.button>
                <div className="mt-6 text-slate-500 text-base font-medium">
                  15-minute call • No obligation • Instant clarity
                </div>
              </div>
            </motion.div>
          )}

          {/* Qualification Message */}
          {showTooSmall && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-10 bg-amber-50 rounded-xl border-2 border-amber-300"
            >
              <div className="text-6xl mb-5">📊</div>
              <p className="text-amber-800 text-lg leading-relaxed m-0 max-w-2xl mx-auto">
                <strong>We typically work with companies processing 100+ invoices monthly.</strong>
                <br/><br/>
                At your current volume, manual processing might still be manageable. 
                Slide to 100+ to see the impact as you grow!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
