import React, { useEffect, useState } from "react";
import "./Background.css";
import "animate.css";

// Component to animate numbers
const CountUp = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2; // duration in seconds
    const totalSteps = end; // total steps equal to the end value
    const incrementTime = (duration * 1000) / totalSteps; // time per step

    const increment = setInterval(() => {
      setCount(prevCount => {
        if (prevCount < end) {
          return prevCount + 1;
        } else {
          clearInterval(increment);
          return end;
        }
      });
    }, incrementTime);

    return () => clearInterval(increment);
  }, [end]);

  return <h3 className="text-white text-7xl font-suwannaphum font-bold">{count.toLocaleString()}</h3>;
};

const Statistics = () => {
  return (
    <div className="flex justify-around font-suwannaphum w-full text-center mt-8 m-5">
      <div className="font-suwannaphum">
        <CountUp end={33030} className="font-suwannaphum"/>
        <span className="text-white text-3xl font-suwannaphum font-bold">សៀវភៅ</span>
      </div>
      <div className="font-suwannaphum">
        <CountUp end={552} />
        <span className="text-white text-3xl font-suwannaphum font-bold">មេរៀន</span>
      </div>
      <div className="font-bold">
        <CountUp end={240} />
        <span className="text-white text-3xl font-suwannaphum font-bold">វេទិកា</span>
      </div>
      <div className="font-suwannaphum">
        <CountUp end={670} />
        <span className="text-white text-3xl font-suwannaphum font-bold">ប្លុក</span>
      </div>
    </div>
  );
};

const Background = () => {
  return (
    <>
      <section className="background">
        <div className="overlay">
          <div className="content">
            <h2 className="text-white font-suwannaphum uppercase font-bold text-3xl sm:text-6xl lg:text-8xl">
              សាលារៀនបែបឌីជីថល
            </h2>
            <div className="w-max mx-auto">
              <h1 className="animate-typing overflow-hidden font-suwannaphum whitespace-nowrap border-r-4 border-r-white text-[19px] p-3 text-white font-bold  md:text-3xl xl:text-3xl lg:text-4xl 2xl:text-5xl 2xl:ml-5 text-justify">
                សម្រាប់អ្នកបង្រៀន និង រៀនជំនាន់ថ្មី
              </h1>
            </div>
            <span className="text-white font-suwannaphum text-xl font-normal mt-4 sm:text-xl sm:px-2 lg:px-16 lg:mt-5 xl:mx-40 xl:px-40 line-clamp-3">
              បង្កើនចំណេះដឹងថ្មីៗជាមួយនឹង STEM Tuto ឆ្ពោះទៅកាន់អនាគតភ្លឺស្វាងជាមួយនឹងការបណ្តុះបណ្តាលតាមបែបទំនេីប STEM ។ 
              នៅ STEM Tuto យើងមានគោលបំណងក្នុងការផ្តល់នូវការយល់ដឹងយ៉ាងជ្រាលជ្រៅ និង ស្រឡាញ់ពេញចិត្តទៅលេីមុខវិជ្ជា វិទ្យាសាស្ត្រ បច្ចេកវិទ្យា វិស្វកម្ម និង គណិតវិទ្យា ដល់សិស្សានុសិស្សគ្រប់វ័យ និងគ្រប់ជំនាន់។ បេសកកម្មរបស់យើងគឺជំរុញ និងអភិវឌ្ឍជំនាន់ក្រោយនៃអ្នកច្នៃប្រឌិត អោយកាន់តែរីកចម្រើនទៅមុខបន្ថែមទៀតក្នុងការ ដោះស្រាយបញ្ហា និងការអភិវឌ្ឍន៍បច្ចេកវិទ្យាថ្មីៗអោយកាន់តែប្រសេីរឡើង។
            </span>
            
            {/* Include the Statistics component here */}
            <Statistics />
          </div>
        </div>
      </section>
    </>
  );
};

export default Background;
