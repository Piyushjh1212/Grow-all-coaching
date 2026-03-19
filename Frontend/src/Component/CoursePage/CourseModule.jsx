import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Productstyle.css";

function CourseModule() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [purchasedModules, setPurchasedModules] = useState([]);

  useEffect(() => {
    const fetchCourseAndPurchases = async () => {
      setLoading(true);
      try {
        // 1️⃣ Fetch course data
        const courseRes = await fetch(
          `http://localhost:5000/api/v1/Courses/module/${id}`
        );
        const courseData = await courseRes.json();
        setCourse(courseData.data || courseData);

        // 2️⃣ Fetch user profile via cookie
        const userRes = await fetch(
          "http://localhost:5000/api/v1/UserLoginSignup/profile",
          {
            credentials: "include", // send cookie automatically
          }
        );

        if (userRes.status === 401) {
          // Not logged in
          setPurchasedModules([]);
          return;
        }

        const userData = await userRes.json();
        const modules =
          userData.purchasedModules || userData.user?.purchasedModules || [];
        setPurchasedModules(modules);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndPurchases();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found</p>;

  // Check if module is purchased & valid
  const isModuleValid = (moduleId) => {
    const pm = purchasedModules.find(
      (m) => m.module?.toString() === moduleId?.toString()
    );
    if (!pm) return false;
    return new Date() <= new Date(pm.expiryDate || pm.validUntil);
  };

  // Payment handler
  const handlePayment = async (moduleId, amount) => {
    if (paymentLoading) return;
    setPaymentLoading(true);

    try {
      // Create Razorpay order
      const orderRes = await fetch(
        "http://localhost:5000/api/v1/Razorpay/createPayment",
        {
          method: "POST",
          credentials: "include", // cookie sent automatically
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ moduleId, amount }),
        }
      );

      if (orderRes.status === 401) {
        alert("Please login first!");
        navigate("/login");
        return;
      }

      const orderData = await orderRes.json();
      if (!orderData.success) {
        alert(orderData.message || "Payment creation failed");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: "INR",
        name: "Grow All Coaching",
        description: "Module Purchase",
        image:
          "https://res.cloudinary.com/dieboinjz/image/upload/v1772387672/GacImages/cjgywtxrv1g6etyve2rl.jpg",
        order_id: orderData.order.id,
        handler: async (response) => {
          try {
            const verifyRes = await fetch(
              "http://localhost:5000/api/v1/Razorpay/verifyPayment",
              {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...response, moduleId }),
              }
            );

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              alert("Payment Successful 🎉");
              const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
              setPurchasedModules((prev) => [
                ...prev,
                { module: moduleId, validUntil },
              ]);
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.error("VERIFY ERROR:", err);
          }
        },
        theme: { color: "#0a93b2" },
        modal: {
          ondismiss: async () => {
            await fetch("http://localhost:5000/api/v1/Razorpay/paymentFailed", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: orderData.order.id }),
            });
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async () => {
        await fetch("http://localhost:5000/api/v1/Razorpay/paymentFailed", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderData.order.id }),
        });
        alert("Payment Failed ❌");
      });

      rzp.open();
    } catch (error) {
      console.error("PAYMENT ERROR:", error);
      alert("Something went wrong with payment");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="cm-products-container">
      <h1 className="cm-module-title">{course?.title}</h1>

      <div className="cm-product-grid">
        {course?.modules?.map((module) => {
          const discountPrice = module.Discountprice || module.Realprice;
          const purchased = isModuleValid(module._id);

          return (
            <div key={module._id} className="cm-product-card">
              <img src={module.Moduleimage} alt={module.title} />
              <p className="cm-module-name">{module.title}</p>

              <div className="cb-cm-price-box">
                <p className="cm-Moduletitle-Realprice">
                  {module.Realprice || "Price N/A"} INR/-
                </p>
                <p className="cm-Moduletitle-Discountprice">
                  {discountPrice} INR/-
                </p>
              </div>

              <div className="cm-button-box">
                {purchased ? (
                  <button
                    className="cm-btn cm-buy-btn"
                    onClick={() =>
                      navigate(`/course/${id}/module/${module._id}`)
                    }
                  >
                    Watch Video
                  </button>
                ) : (
                  <button
                    className="cm-btn cm-brochure-btn"
                    disabled={paymentLoading}
                    onClick={() => handlePayment(module._id, discountPrice)}
                  >
                    {paymentLoading ? "Processing..." : "Buy Now"}
                  </button>
                )}

                <button className="cm-Product-container-button">
                  Brochure
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CourseModule;