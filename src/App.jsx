import React, { useState } from 'react';
    import { Upload, AlertTriangle, BarChart3, ShieldCheck, DollarSign } from 'lucide-react';
    import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
    
    export default function App() {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [isUploading, setIsUploading] = useState(false);
      const [auditComplete, setAuditComplete] = useState(false);
    
      const chartData = [
        { name: 'Jan', employerPaid: 4000, pharmacyReimbursed: 2400, spread: 1600 },
        { name: 'Feb', employerPaid: 3000, pharmacyReimbursed: 1398, spread: 1602 },
        { name: 'Mar', employerPaid: 2000, pharmacyReimbursed: 9800, spread: -7800 },
        { name: 'Apr', employerPaid: 2780, pharmacyReimbursed: 3908, spread: -1128 },
        { name: 'May', employerPaid: 1890, pharmacyReimbursed: 4800, spread: -2910 },
        { name: 'Jun', employerPaid: 2390, pharmacyReimbursed: 3800, spread: -1410 }
      ];
    
      const handleFileUpload = (e) => {
        e.preventDefault();
        setIsUploading(true);
        setTimeout(() => {
          setIsUploading(false);
          setAuditComplete(true);
        }, 2500);
      };
    
      if (!isAuthenticated) {
        return (
          <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="max-w-3xl text-center space-y-6">
              <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">TrueTrans <span className="text-blue-600">PBM Auditor</span></h1>
              <p className="text-xl text-slate-600 font-medium">Now Auditing Q1 2026 Data</p>
              <h2 className="text-3xl font-bold text-slate-800">Expose the Shadow Revenue in your PBM.</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">The first transparent auditor for self-insured employers. Ingest claims, identify spread pricing, and recover withheld rebates in minutes.</p>
              <button onClick={() => setIsAuthenticated(true)} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors text-lg">Launch Demo Workspace</button>
              <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <BarChart3 className="w-10 h-10 text-blue-500 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Automated Spread Detection</h3>
                  <p className="text-slate-600 text-sm">Instantly contrast Employer Paid vs Pharmacy Reimbursed across your entire claim set.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <DollarSign className="w-10 h-10 text-green-500 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Rebate Pass-Through Audit</h3>
                  <p className="text-slate-600 text-sm">Quantify retained rebates on high-volume brands that your PBM isn't passing back to you.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <ShieldCheck className="w-10 h-10 text-purple-500 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Fiduciary Compliance</h3>
                  <p className="text-slate-600 text-sm">Generate the audit evidence needed to satisfy ERISA-800 obligations for health plans.</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
    
      return (
        <div className="min-h-screen bg-slate-100 p-8">
          <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
            <h1 className="text-2xl font-bold text-slate-800">TrueTrans PBM Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Cloud Session ID: pbm-auditor-mvp</span>
              <button onClick={() => setIsAuthenticated(false)} className="text-sm text-slate-600 hover:text-slate-900">Sign Out</button>
            </div>
          </header>
          {!auditComplete ? (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center mt-20">
              <Upload className="w-16 h-16 text-blue-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Upload Claims Data</h2>
              <p className="text-slate-600 mb-8">Upload your standard 835/837 or CSV claims extract to begin the audit against NADAC benchmarks.</p>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 bg-slate-50">
                <input type="file" className="hidden" id="file-upload" onChange={handleFileUpload} />
                <label htmlFor="file-upload" className="cursor-pointer bg-white border border-slate-300 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors inline-block">{isUploading ? 'Ingesting and Processing...' : 'Select CSV File'}</label>
                <div className="mt-4">
                  <a href="#" className="text-sm text-blue-600 hover:underline">Need a sample file?</a>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-slate-500 font-medium text-sm">Total Claims Processed</h3>
                  <p className="text-3xl font-bold text-slate-800 mt-2">42,891</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-slate-500 font-medium text-sm">Detected Spread Pricing</h3>
                  <p className="text-3xl font-bold text-red-600 mt-2">$1.42M</p>
                  <p className="text-sm text-red-500 mt-1 flex items-center"><AlertTriangle className="w-4 h-4 mr-1"/> 14.2% Overcharge</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-slate-500 font-medium text-sm">Missing Rebates Found</h3>
                  <p className="text-3xl font-bold text-green-600 mt-2">$845k</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg mb-6">Employer Paid vs. Pharmacy Reimbursed (Spread)</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="employerPaid" name="Amount Billed to Employer" stroke="#ef4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="pharmacyReimbursed" name="Amount Paid to Pharmacy" stroke="#22c55e" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    
