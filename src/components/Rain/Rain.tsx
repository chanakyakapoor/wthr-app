import "./rain.css";
//random number between 98 and 1
var randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
//random number between 5 and 2
var randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);

const drops: React.ReactNode[] = [];
const backDrops: React.ReactNode[] = [];

let increment = 0;
while (increment < 100) {
  //couple random numbers to use for various randomizations
  //increment
  increment += randoFiver;
  //add in a new raindrop with various randomizations to certain CSS properties
  let drop = (
    <div
      className="drop"
      style={{
        left: increment + "%",
        bottom: randoFiver + randoFiver - 1 + 100 + "%",
        animationDelay: "0." + randoHundo + "s",
        animationDuration: "0.5" + randoHundo + "s",
      }}
    >
      <div
        className="stem"
        style={{
          animationDelay: "0." + randoHundo + "s",
          animationDuration: "0.5" + randoHundo + "s",
        }}
      ></div>
    </div>
  );

  let backDrop = (
    <div
      className="drop"
      style={{
        right: increment + "%",
        bottom: randoFiver + randoFiver - 1 + 100 + "%",
        animationDelay: "0." + randoHundo + "s",
        animationDuration: "0.5" + randoHundo + "s",
      }}
    >
      <div
        className="stem"
        style={{
          animationDelay: "0." + randoHundo + "s",
          animationDuration: "0.5" + randoHundo + "s",
        }}
      ></div>
    </div>
  );

  drops.push(drop);
  backDrops.push(backDrop);
}

export const Rain = () => {
  return (
    <div className="rain__container">
      <div className="rain front-row">{drops}</div>
      <div className="rain back-row">{backDrops}</div>
    </div>
  );
};

// var makeItRain = function() {
//     //clear out everything
//     $('.rain').empty();
//random number between 98 and 1
// var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
// random number between 5 and 2
// var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));

//     var increment = 0;
//     var drops = "";
//     var backDrops = "";

//     while (increment < 100) {
//       //couple random numbers to use for various randomizations

//       //increment
//       increment += randoFiver;
//       //add in a new raindrop with various randomizations to certain CSS properties
//       drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
//       backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
//     }

//     $('.rain.front-row').append(drops);
//     $('.rain.back-row').append(backDrops);
//   }

//   $('.splat-toggle.toggle').on('click', function() {
//     $('body').toggleClass('splat-toggle');
//     $('.splat-toggle.toggle').toggleClass('active');
//     makeItRain();
//   });

//   $('.back-row-toggle.toggle').on('click', function() {
//     $('body').toggleClass('back-row-toggle');
//     $('.back-row-toggle.toggle').toggleClass('active');
//     makeItRain();
//   });

//   $('.single-toggle.toggle').on('click', function() {
//     $('body').toggleClass('single-toggle');
//     $('.single-toggle.toggle').toggleClass('active');
//     makeItRain();
//   });

//   makeItRain();
