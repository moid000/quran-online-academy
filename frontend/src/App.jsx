import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Register from './pages/Register';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminStudents from './pages/admin/Students';
import AdminCourses from './pages/admin/Courses';
import AdminFeePackages from './pages/admin/FeePackages';
import AdminBlog from './pages/admin/Blog';
import AdminMessages from './pages/admin/Messages';
import AdminPaymentMethods from './pages/admin/PaymentMethods';
import AdminSettings from './pages/admin/Settings';

function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <LayoutWrapper>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          
          {/* Fees / Pricing */}
          <Route path="/fees" element={<Pricing />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Blogs */}
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <ProtectedRoute>
                <AdminStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute>
                <AdminCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/fee-packages"
            element={
              <ProtectedRoute>
                <AdminFeePackages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <ProtectedRoute>
                <AdminBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute>
                <AdminMessages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/payment-methods"
            element={
              <ProtectedRoute>
                <AdminPaymentMethods />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LayoutWrapper>
    </>
  );
}
