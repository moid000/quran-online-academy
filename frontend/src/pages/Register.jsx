import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, BookOpen, CreditCard, Upload, CheckCircle2, AlertCircle,
  ArrowRight, ArrowLeft, Check, FileUp, Loader2
} from 'lucide-react';
import { getCourses } from '../api/courses';
import { getPaymentMethods } from '../api/paymentMethods';
import { registerStudent } from '../api/students';
import GlassCard from '../components/GlassCard';

const courseList = [
  'Basic Qaidah',
  'Quran Reading (Nazra)',
  'Quran Memorization (Hifz)',
  'Tajweed Course',
  'Quran Translation',
  'Daily Duas & Kalimas',
  'Hadith Studies',
  'Islamic Studies',
];

const packageList = [
  { name: '3 Days / Weekly', price: 20 },
  { name: '4 Days / Weekly', price: 30 },
  { name: '5 Days / Weekly', price: 40 },
  { name: 'Weekend Only', price: 30 },
];

const steps = ['Personal Info', 'Course Selection', 'Payment Method', 'Upload Receipt'];

export default function Register() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState([]);

  const [formData, setFormData] = useState({
    student_name: '',
    father_name: '',
    email: '',
    whatsapp: '',
    country: '',
    course: '',
    package: searchParams.get('package') || '',
    payment_method: '',
    payment_screenshot: '',
  });

  useEffect(() => {
    getPaymentMethods().then(methods => {
      setPaymentMethods(methods.filter(m => m.is_active !== false));
    });
    getCourses().then(courses => {
      // If course passed via URL
      const urlCourse = searchParams.get('course');
      if (urlCourse) setFormData(prev => ({ ...prev, course: urlCourse }));
    });
  }, [searchParams]);

  const updateField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      // Create local preview URL (since we don't have Base44 file upload)
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('payment_screenshot', reader.result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedPayment = paymentMethods.find(m => m._id === formData.payment_method);
  const selectedPackage = packageList.find(p => p.name === formData.package);

  const isStepValid = (stepNum) => {
    if (stepNum === 1) return formData.student_name && formData.father_name && formData.email && formData.whatsapp && formData.country;
    if (stepNum === 2) return formData.course && formData.package;
    if (stepNum === 3) return formData.payment_method;
    return true;
  };

  const handleSubmit = async () => {
    if (!formData.payment_screenshot) {
      setError('Please upload payment screenshot');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      // Send a plain object - api layer uploads the screenshot to Cloudinary,
      // then POSTs JSON to the backend which expects JSON (not multipart FormData)
      const payload = {
        ...formData,
        payment_method_name: selectedPayment ? selectedPayment.name : '',
        status: 'pending',
      };
      const res = await registerStudent(payload);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.message || 'Failed to submit registration. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit registration. Please try again.');
    }
    setSubmitting(false);
  };

  // SUCCESS SCREEN
  if (success) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <GlassCard className="p-8">
            <div className="w-20 h-20 rounded-full bg-brand-green flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Registration Successful!</h2>
            <p className="text-slate-600 mb-6">
              Thank you for registering with QURAN ONLINE ACADEMIA. We will verify your payment and contact you within 24 hours.
            </p>
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <button className="w-full bg-brand-green hover:bg-[#2a4a38] text-white py-3 rounded-xl font-semibold transition-colors">
                Back to Home
              </button>
            </Link>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white">

      {/* 1. HERO SECTION */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Student Registration
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white"
            >
              Complete your enrollment in 4 simple steps
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. STEP INDICATOR */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            {steps.map((label, idx) => (
              <div key={idx} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step > idx + 1 || step === idx + 1
                    ? 'bg-brand-green text-white'
                    : 'bg-gray-200 text-slate-600'
                }`}>
                  {step > idx + 1 ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                {idx < 3 && (
                  <div className={`w-12 md:w-24 h-1 mx-2 rounded ${
                    step > idx + 1 ? 'bg-brand-green' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. FORM CARD */}
      <div className="container mx-auto px-4 pb-24">
        <div className="max-w-2xl mx-auto">
          <GlassCard className="p-6 md:p-8">

            {/* STEP 1: Personal Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-brand-green" />
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-slate-700">Student Name *</label>
                    <input
                      value={formData.student_name}
                      onChange={(e) => updateField('student_name', e.target.value)}
                      placeholder="Enter full name"
                      className="w-full bg-white border border-gray-300 text-slate-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-700">Father Name *</label>
                    <input
                      value={formData.father_name}
                      onChange={(e) => updateField('father_name', e.target.value)}
                      placeholder="Enter father's name"
                      className="w-full bg-white border border-gray-300 text-slate-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-700">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="Enter email address"
                    className="w-full bg-white border border-gray-300 text-slate-900 placeholder:text-slate-500 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-700">WhatsApp Number *</label>
                  <input
                    value={formData.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                    placeholder="+1 234 567 890"
                    className="w-full bg-white border border-gray-300 text-slate-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-700">Country *</label>
                  <input
                    value={formData.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    placeholder="Enter your country"
                    className="w-full bg-white border border-gray-300 text-slate-900 placeholder:text-slate-500 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: Course Selection */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-green" />
                  Course Selection
                </h2>

                <div className="space-y-2">
                  <label className="text-slate-700">Select Course *</label>
                  <select
                    value={formData.course}
                    onChange={(e) => updateField('course', e.target.value)}
                    className="w-full bg-white border border-gray-300 text-slate-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none"
                  >
                    <option value="" disabled>Choose a course</option>
                    {courseList.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-700">Select Package *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {packageList.map(pkg => (
                      <button
                        key={pkg.name}
                        onClick={() => updateField('package', pkg.name)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          formData.package === pkg.name
                            ? 'bg-brand-green/10 border-brand-green text-slate-900'
                            : 'bg-white border-gray-300 text-slate-700 hover:bg-gray-50'
                        }`}
                      >
                        <p className="font-semibold">{pkg.name}</p>
                        <p className="text-brand-green text-lg font-bold">${pkg.price}/mo</p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Payment Method */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-brand-green" />
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {paymentMethods.map(pm => (
                    <button
                      key={pm._id}
                      onClick={() => updateField('payment_method', pm._id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        formData.payment_method === pm._id
                          ? 'bg-brand-green/10 border-brand-green'
                          : 'bg-white border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <p className="font-semibold text-slate-900">{pm.name}</p>
                    </button>
                  ))}
                </div>

                {selectedPayment && (
                  <div className="bg-brand-green/10 border border-brand-green/30 rounded-xl p-4 mt-6">
                    <h3 className="text-brand-green font-semibold mb-3">Payment Details</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-slate-700">
                        <span className="text-slate-600">Account Title: </span>
                        {selectedPayment.accountName || selectedPayment.account_title}
                      </p>
                      <p className="text-slate-700">
                        <span className="text-slate-600">Account/Number: </span>
                        {selectedPayment.accountNumber || selectedPayment.account_number}
                      </p>
                      <p className="text-slate-700">
                        <span className="text-slate-600">Amount: </span>
                        <span className="text-brand-green font-bold">${selectedPackage?.price || 0}</span>
                      </p>
                      <p className="text-slate-600 mt-3 text-xs">
                        {selectedPayment.instructions}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 4: Upload Receipt */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-brand-green" />
                  Upload Payment Screenshot
                </h2>

                <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  {formData.payment_screenshot ? (
                    <div className="space-y-4">
                      <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto" />
                      <p className="text-brand-green font-semibold">Screenshot Uploaded Successfully</p>
                      <img
                        src={formData.payment_screenshot}
                        alt="Payment Screenshot"
                        loading="lazy"
                        className="max-w-xs mx-auto rounded-lg"
                      />
                      <label className="cursor-pointer text-brand-green hover:underline">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        Change Image
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      {uploading ? (
                        <div className="space-y-4">
                          <Loader2 className="w-12 h-12 text-brand-green mx-auto animate-spin" />
                          <p className="text-slate-600">Uploading...</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <FileUp className="w-12 h-12 text-slate-600 mx-auto" />
                          <p className="text-slate-700">Click to upload payment screenshot</p>
                          <p className="text-slate-600 text-sm">PNG, JPG up to 10MB</p>
                        </div>
                      )}
                    </label>
                  )}
                </div>

                {/* Registration Summary */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-slate-900 font-semibold mb-3">Registration Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Student:</span>
                      <span className="text-slate-900">{formData.student_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Course:</span>
                      <span className="text-slate-900">{formData.course}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Package:</span>
                      <span className="text-slate-900">{formData.package}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Amount:</span>
                      <span className="text-brand-green font-bold">${selectedPackage?.price || 0}/month</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg p-3 mt-4">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-slate-900 hover:bg-gray-100 font-medium flex items-center gap-2 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  onClick={() => isStepValid(step) && setStep(step + 1)}
                  disabled={!isStepValid(step)}
                  className="px-6 py-2 rounded-lg bg-brand-green hover:bg-[#2a4a38] text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !formData.payment_screenshot}
                  className="px-6 py-2 rounded-lg bg-brand-green hover:bg-[#2a4a38] text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Complete Registration
                    </>
                  )}
                </button>
              )}
            </div>

          </GlassCard>
        </div>
      </div>

    </div>
  );
}
