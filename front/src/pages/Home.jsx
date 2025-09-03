import React, { useState } from "react";
import axios from "axios";
import { API } from '../constant';
import bg from "../assets/sardar1.jpg";
import Navbar from "../../components/Navbar";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    problem: ""
  });
  const [message, setMessage] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [showSubmissions, setShowSubmissions] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/submit`, formData);
      setMessage(res.data.message === "Submission successful"
        ? "સબમિશન સફળ થયું"
        : res.data.message);
      setFormData({ name: "", mobile: "", problem: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "ફોર્મ સબમિટ કરવામાં ભૂલ આવી");
    }
  };

  const handleViewAll = async () => {
    const password = prompt("પાસવર્ડ દાખલ કરો");
    if (!password) return;

    try {
      const res = await axios.post(`${API}/api/get-all`, { password });
      setSubmissions(res.data);
      setShowSubmissions(true);
    } catch (err) {
      alert(err.response?.data?.message || "ડેટા લાવવામાં ભૂલ");
    }
  };

  return (
    <>
      {/* <Navbar/> */}
      <div className="relative min-h-screen text-gray-900 pt-12">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
          style={{ backgroundImage: `url(${bg})` }}
        ></div>

        <div className="relative z-10 p-4">

          {/* Form */}
          <div className="flex items-center justify-center py-20">
            <form
              onSubmit={handleSubmit}
              className=" bg-opacity-90 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-teal-600">
                પાટીદાર ફરિયાદ બેંક

              </h2>

              <input
                type="text"
                name="name"
                placeholder="તમારું નામ"
                value={formData.name}
                onChange={handleChange}
                className="w-full mb-4 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
              />

              <input
                type="text"
                name="mobile"
                placeholder="મોબાઇલ નંબર"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full mb-4 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
              />

              <textarea
                name="problem"
                placeholder="આપની સાથે હાલ કોઈ ઘટના ઘટી છે અથવા કોઈ સમસ્યા છે તો અહીં લખો."
                value={formData.problem}
                onChange={handleChange}
                className="w-full mb-4 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none h-32"
                required
              />

              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 rounded text-white font-semibold transition"
              >
                સબમિટ કરો
              </button>

              {message && (
                <p className="mt-4 text-center text-teal-600 font-medium">{message}</p>
              )}
            </form>
          </div>

          {/* View All Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleViewAll}
              className=" text-white px-4 sm:px-6 py-2 rounded font-semibold"
            >
              તમામ દાખલાઓ જુઓ
            </button>
          </div>

          {/* Submissions Table */}
          {showSubmissions && submissions.length > 0 && (
            <div className="max-w-3xl mx-auto bg-white bg-opacity-90 p-4 sm:p-6 rounded-xl shadow-lg overflow-x-auto">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-teal-600">તમારા તમામ દાખલાઓ</h3>
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2 text-left">નામ</th>
                    <th className="border p-2 text-left">મોબાઇલ</th>
                    <th className="border p-2 text-left">સમસ્યા</th>
                    <th className="border p-2 text-left">તારીખ</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-100">
                      <td className="border p-2">{item.name}</td>
                      <td className="border p-2">{item.mobile}</td>
                      <td className="border p-2">{item.problem}</td>
                      <td className="border p-2">{new Date(item.createdAt).toLocaleString("gu-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Home;
