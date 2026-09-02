import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  User,
  Mail,
  Phone,
  Globe,
  Award,
  CreditCard,
  Upload,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { getCourses } from '../api/courses';
import { getFeePackages } from '../api/feePackages';
import { getPaymentMethods } from '../api/paymentMethods';
import { registerStudent } from '../api/students';

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Pakistan',
  'Saudi Arabia',
  'United Arab Emirates',
  'Qatar',
  'Oman',
  'Kuwait',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Malaysia',
  'Singapore',
  'South Africa',
  'Norway',
  'Sweden',
  'Netherlands',
  'Other'
];

export default function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [feePackages, setFeePackages] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [formData, setFormData] = useState({
    student_name: '',
    father_name: '',
    email: '',
    whatsapp: '',
    country: 'United States',
    course: '',
    package: '',
    payment_method: '',
  });

  const [screenshotFile, setScreenshotFile] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    Promise.all([
      getCourses(),
      getFeePackages(),
      getPaymentMethods()
    ]).then(([cList, pList, mList]) => {
      setCourses(cList);
      setFeePackages(pList);
      setPaymentMethods(mList);

      const urlCourse = searchParams.get('course') || searchParams.get('courseId');
      const urlPackage = searchParams.get('package') || searchParams.get('packageId');

      setFormData(prev => ({
        ...prev,
        course: urlCourse || (cList.length > 0 ? cList[0].id : ''),
        package: urlPackage || (pList.length > 0 ? pList[0].id : ''),
        payment_method: mList.length > 0 ? mList[0].id : ''
      }));

      setLoadingData(false);
    }).catch(err => {
      console.error('Error fetching registration options:', err);
      setLoadingData(false);
    });
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('File size must be under 5MB');
        return;
      }
      setScreenshotFile(file);
      setScreenshotPreview(URL.createObjectURL(file));
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!formData.student_name.trim()) return setErrorMessage('Student name is required.');
    if (!formData.father_name.trim()) return setErrorMessage('Father / Guardian name is required.');
    if (!formData.email.trim() || !formData.email.includes('@')) return setErrorMessage('A valid email is required.');
    if (!formData.whatsapp.trim()) return setErrorMessage('WhatsApp number is required.');
    if (!formData.course) return setErrorMessage('Please select a course.');
    if (!formData.package) return setErrorMessage('Please select a fee package.');

    setIsSubmitting(true);

    try {
      const selectedCourse = courses.find(c => c.id === formData.course || c.slug === formData.course);
      const selectedPackage = feePackages.find(p => p.id === formData.package);
      const selectedMethod = paymentMethods.find(m => m.id === formData.payment_method);

      const fd = new FormData();
      fd.append('studentName', formData.student_name);
      fd.append('fatherName', formData.father_name);
      fd.append('email', formData.email);
      fd.append('whatsapp', formData.whatsapp);
      fd.append('country', formData.country);
      fd.append('courseId', formData.course);
      fd.append('courseTitle', selectedCourse?.title || formData.course);
      fd.append('packageId', formData.package);
      fd.append('packageName', selectedPackage?.name || formData.package);
      fd.append('paymentMethodId', formData.payment_method);
      fd.append('paymentMethodName', selectedMethod?.name || formData.payment_method);

      if (screenshotFile) {
        fd.append('paymentScreenshot', screenshotFile);
      }

      const res = await registerStudent(fd);

      if (res.success || res.student) {
        setSubmittedData({
          studentName: formData.student_name,
          courseName: selectedCourse?.title || 'Selected Course',
          packageName: selectedPackage?.name || 'Selected Package',
          whatsapp: formData.whatsapp
        });
      } else {
        setErrorMessage(res.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred during registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPaymentMethodObj = paymentMethods.find(m => m.id === formData.payment_method);

  if (submittedData) {
    const waText = encodeURIComponent(
      `Assalamu Alaikum! I have just registered on Quran Online Academia.\n` +
      `Student Name: ${submittedData.studentName}\n` +
      `Course: ${submittedData.courseName}\n` +
      `Package: ${submittedData.packageName}\n` +
      `WhatsApp: ${submittedData.whatsapp}\n` +
      `Please verify my enrollment and schedule my free trial class.`
    );
    const waUrl = `https://wa.me/923177479286?text=${waText}`;

    return (
      <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-100 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Registration Successful
              </span>
              <h1 className="text-3xl font-bold font-serif text-slate-900">JazakAllah Khair!</h1>
              <p className="text-slate-600 text-sm leading-relaxed max-w-lg mx-auto">
                Thank you for enrolling <strong className="text-emerald-900">{submittedData.studentName}</strong> in{' '}
                <strong className="text-emerald-900">{submittedData.courseName}</strong>.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-emerald-200/60">
                <span className="text-slate-500">Student Name:</span>
                <span className="font-bold text-slate-800">{submittedData.studentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-200/60">
                <span className="text-slate-500">Course:</span>
                <span className="font-bold text-emerald-900">{submittedData.courseName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-200/60">
                <span className="text-slate-500">Package:</span>
                <span className="font-bold text-slate-800">{submittedData.packageName}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">WhatsApp:</span>
                <span className="font-bold text-slate-800">{submittedData.whatsapp}</span>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs text-left flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Next Step:</strong> Click the button below to send your details directly to our WhatsApp support team (+92 317 7479 286). We will confirm your class schedule within 1 hour!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#395240] hover:bg-[#2d4233] text-white font-bold text-sm rounded-full shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5 text-emerald-300" />
                <span>Confirm on WhatsApp Now</span>
              </a>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-full transition-colors"
              >
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* HEADER BANNER */}
      <section className="bg-hero-gradient text-white py-12 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-islamic-pattern opacity-30 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-3">
          <span className="font-arabic text-3xl text-gold font-bold block drop-shadow-md">
            تَسْجِيلُ الطَّالِبِ فِي الكُلِّيَّةِ
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
            Student Registration Form
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Fill out the enrollment details below to start your 3-Day Free Trial. No commitment required.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
          
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-semibold flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section 1: Personal Details */}
            <div className="space-y-4">
              <h3 className="text-base font-bold font-serif text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-800" />
                <span>1. Personal & Contact Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="student_name"
                    value={formData.student_name}
                    onChange={handleChange}
                    placeholder="e.g. Ibrahim Ahmed"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Father / Guardian Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="father_name"
                    value={formData.father_name}
                    onChange={handleChange}
                    placeholder="e.g. Tariq Ahmed"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. tariq@example.com"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Number (with country code) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="e.g. +1 555 234 5678"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Country of Residence <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 text-xs text-slate-800 bg-white"
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Section 2: Course & Package Selection */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold font-serif text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-800" />
                <span>2. Select Course & Fee Package</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 text-xs text-slate-800 bg-white"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.level})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Fee Package <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 text-xs text-slate-800 bg-white"
                  >
                    {feePackages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} - ${p.priceUsd}/mo ({p.classesPerWeek || p.classesPerMonth})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Payment Details & Proof */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold font-serif text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-800" />
                <span>3. Payment Method & Receipt Upload</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Method
                </label>
                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 text-xs text-slate-800 bg-white"
                >
                  {paymentMethods.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.accountName || m.type})
                    </option>
                  ))}
                </select>
              </div>

              {selectedPaymentMethodObj && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1.5">
                  <p className="font-bold text-slate-800">{selectedPaymentMethodObj.name} Account Instructions:</p>
                  {selectedPaymentMethodObj.accountName && (
                    <p className="text-slate-600"><strong>Title:</strong> {selectedPaymentMethodObj.accountName}</p>
                  )}
                  {selectedPaymentMethodObj.accountNumber && (
                    <p className="text-slate-600"><strong>Account / IBAN:</strong> {selectedPaymentMethodObj.accountNumber}</p>
                  )}
                  {selectedPaymentMethodObj.instructions && (
                    <p className="text-slate-500 italic mt-1">{selectedPaymentMethodObj.instructions}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Screenshot / Receipt (Optional for Free Trial)
                </label>
                
                <div className="border-2 border-dashed border-slate-200 hover:border-emerald-800 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="screenshot-upload"
                    className="hidden"
                  />
                  <label htmlFor="screenshot-upload" className="cursor-pointer space-y-2 block">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                    <span className="text-xs text-slate-600 font-medium block">
                      Click to upload payment screenshot or receipt
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      JPG, PNG or WEBP (Max 5MB)
                    </span>
                  </label>
                </div>

                {screenshotPreview && (
                  <div className="mt-3 flex items-center gap-3 p-2 bg-emerald-50 rounded-xl border border-emerald-200">
                    <img
                      src={screenshotPreview}
                      alt="Payment Preview"
                      className="w-16 h-16 object-cover rounded-lg border border-emerald-300 shrink-0"
                    />
                    <div className="text-xs truncate">
                      <p className="font-semibold text-emerald-900 truncate">{screenshotFile?.name}</p>
                      <p className="text-slate-500">{(screenshotFile?.size / 1024).toFixed(1)} KB</p>
                      <button
                        type="button"
                        onClick={() => {
                          setScreenshotFile(null);
                          setScreenshotPreview(null);
                        }}
                        className="text-red-600 hover:underline text-[11px] font-bold mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gold hover:bg-gold-light text-emerald-950 font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting Registration...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Start 3-Day Free Trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}
