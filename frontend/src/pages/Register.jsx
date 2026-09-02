import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  FileText,
  Check,
  ArrowRight
} from 'lucide-react';
import { getCourses } from '../api/courses';
import { getFeePackages } from '../api/feePackages';
import { getPaymentMethods } from '../api/paymentMethods';
import { registerStudent } from '../api/students';

const countryList = [
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

  const [courses, setCourses] = useState([]);
  const [feePackages, setFeePackages] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    Promise.all([
      getCourses(),
      getFeePackages(),
      getPaymentMethods()
    ])
      .then(([cList, pList, mList]) => {
        setCourses(cList);
        setFeePackages(pList);
        setPaymentMethods(mList);

        const urlCourse = searchParams.get('course') || searchParams.get('courseId');
        const urlPackage = searchParams.get('package') || searchParams.get('packageId');

        setFormData((prev) => ({
          ...prev,
          course: urlCourse || (cList.length > 0 ? cList[0].id : ''),
          package: urlPackage || (pList.length > 0 ? pList[0].id : ''),
          payment_method: mList.length > 0 ? mList[0].id : ''
        }));

        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching form parameters:', err);
        setLoading(false);
      });
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('File size must be under 5MB.');
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

    if (!formData.student_name.trim()) return setErrorMessage('Student Name is required.');
    if (!formData.father_name.trim()) return setErrorMessage('Father / Guardian Name is required.');
    if (!formData.email.trim() || !formData.email.includes('@')) return setErrorMessage('A valid email address is required.');
    if (!formData.whatsapp.trim()) return setErrorMessage('WhatsApp Number is required.');
    if (!formData.course) return setErrorMessage('Please select a course.');
    if (!formData.package) return setErrorMessage('Please select a fee package.');

    setSubmitting(true);

    try {
      const selectedCourseObj = courses.find((c) => c.id === formData.course || c.slug === formData.course);
      const selectedPackageObj = feePackages.find((p) => p.id === formData.package);
      const selectedPaymentObj = paymentMethods.find((m) => m.id === formData.payment_method);

      const fd = new FormData();
      fd.append('studentName', formData.student_name);
      fd.append('fatherName', formData.father_name);
      fd.append('email', formData.email);
      fd.append('whatsapp', formData.whatsapp);
      fd.append('country', formData.country);
      fd.append('courseId', formData.course);
      fd.append('courseTitle', selectedCourseObj?.title || formData.course);
      fd.append('packageId', formData.package);
      fd.append('packageName', selectedPackageObj?.name || formData.package);
      fd.append('paymentMethodId', formData.payment_method);
      fd.append('paymentMethodName', selectedPaymentObj?.name || formData.payment_method);

      if (screenshotFile) {
        fd.append('paymentScreenshot', screenshotFile);
      }

      const res = await registerStudent(fd);

      if (res.success || res.student) {
        setSubmittedData({
          studentName: formData.student_name,
          courseName: selectedCourseObj?.title || 'Selected Course',
          packageName: selectedPackageObj?.name || 'Selected Package',
          paymentMethod: selectedPaymentObj?.name || 'Selected Method',
          whatsapp: formData.whatsapp
        });
      } else {
        setErrorMessage(res.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred during registration.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPaymentMethodObj = paymentMethods.find((m) => m.id === formData.payment_method);

  if (submittedData) {
    const waMessage = encodeURIComponent(
      `Assalamu Alaikum! I have just completed registration on Quran Online Academy.\n\n` +
      `Student Name: ${submittedData.studentName}\n` +
      `Course: ${submittedData.courseName}\n` +
      `Package: ${submittedData.packageName}\n` +
      `Payment Method: ${submittedData.paymentMethod}\n` +
      `WhatsApp: ${submittedData.whatsapp}\n\n` +
      `Please confirm my registration and schedule my trial class.`
    );
    const waUrl = `https://wa.me/923177479286?text=${waMessage}`;

    return (
      <div className="pt-20 min-h-screen bg-white py-24 px-4">
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto text-white">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">Registration Submitted!</h1>
          
          <p className="text-slate-700 leading-relaxed max-w-lg mx-auto">
            JazakAllah Khair! Your registration for <strong className="text-slate-900">{submittedData.studentName}</strong> has been received successfully.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left text-sm space-y-3">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-slate-500">Student Name:</span>
              <span className="font-semibold text-slate-900">{submittedData.studentName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-slate-500">Selected Course:</span>
              <span className="font-semibold text-slate-900">{submittedData.courseName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-slate-500">Fee Package:</span>
              <span className="font-semibold text-slate-900">{submittedData.packageName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">WhatsApp Contact:</span>
              <span className="font-semibold text-slate-900">{submittedData.whatsapp}</span>
            </div>
          </div>

          <p className="text-sm text-slate-600">
            Click below to notify our admission team on WhatsApp and schedule your class timings right away:
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-green hover:bg-[#2a4a38] text-white rounded-full font-medium px-6 py-3 flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Confirm on WhatsApp</span>
            </a>
            <Link
              to="/"
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold px-8 py-3 transition-colors shadow-sm flex items-center justify-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      
      {/* HEADER & FORM CONTAINER */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="text-brand-green font-arabic text-2xl">﷽</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              Student Registration
            </h1>
            <p className="text-lg text-slate-600">
              Begin your Quranic journey today
            </p>
            <div className="h-1 w-24 bg-brand-green mx-auto mt-6 rounded-full" />
          </div>

          {/* Form Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
            {errorMessage && (
              <div className="p-4 rounded-xl mb-6 bg-red-50 text-red-900 border border-red-200 flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {loading ? (
              <div className="py-12 text-center text-slate-500">
                Loading registration details...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Student Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="student_name"
                    value={formData.student_name}
                    onChange={handleChange}
                    placeholder="Full name of student"
                    required
                    className="w-full bg-white border border-gray-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  />
                </div>

                {/* Father / Guardian Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Father / Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="father_name"
                    value={formData.father_name}
                    onChange={handleChange}
                    placeholder="Father or guardian full name"
                    required
                    className="w-full bg-white border border-gray-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  />
                </div>

                {/* Email & WhatsApp */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      required
                      className="w-full bg-white border border-gray-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      WhatsApp Number *
                    </label>
                    <input
                      type="text"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="+1 234 567 890"
                      required
                      className="w-full bg-white border border-gray-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Country of Residence *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  >
                    {countryList.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Course Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Course *
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  >
                    <option value="" disabled>Choose a course...</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title} ({course.level || 'All Levels'})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fee Package Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Fee Package *
                  </label>
                  <select
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  >
                    <option value="" disabled>Choose a fee package...</option>
                    {feePackages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} - ${pkg.priceUsd || pkg.price_usd}/month
                      </option>
                    ))}
                  </select>
                </div>

                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Payment Method *
                  </label>
                  <select
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  >
                    <option value="" disabled>Choose payment method...</option>
                    {paymentMethods.map((pm) => (
                      <option key={pm.id} value={pm.id}>
                        {pm.name} ({pm.type})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Payment Method Info Box */}
                {selectedPaymentMethodObj && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-slate-700 space-y-2">
                    <p className="font-semibold text-slate-900 text-sm">{selectedPaymentMethodObj.name}</p>
                    {selectedPaymentMethodObj.accountName && (
                      <p><strong>Account Name:</strong> {selectedPaymentMethodObj.accountName}</p>
                    )}
                    {selectedPaymentMethodObj.accountNumber && (
                      <p><strong>Account Number:</strong> {selectedPaymentMethodObj.accountNumber}</p>
                    )}
                    {selectedPaymentMethodObj.bankName && (
                      <p><strong>Bank / Service:</strong> {selectedPaymentMethodObj.bankName}</p>
                    )}
                    {selectedPaymentMethodObj.iban && (
                      <p className="break-all"><strong>IBAN:</strong> {selectedPaymentMethodObj.iban}</p>
                    )}
                    <p className="text-slate-500 italic mt-1">{selectedPaymentMethodObj.instructions}</p>
                  </div>
                )}

                {/* Payment Screenshot File Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Payment Receipt / Screenshot (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-slate-700">
                      {screenshotFile ? screenshotFile.name : 'Click or drag image to upload receipt'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
                  </div>

                  {screenshotPreview && (
                    <div className="mt-3 relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200">
                      <img
                        src={screenshotPreview}
                        alt="Screenshot Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold w-full py-4 transition-colors shadow-sm disabled:opacity-50 text-base"
                  >
                    {submitting ? 'Submitting Registration...' : 'Complete Student Registration'}
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
