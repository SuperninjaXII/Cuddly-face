let tl = gsap.timeline();

tl.to(".blob", {
  rotateX: "5turns",
  x: 2,
  y: 70,
  background: "conic-gradient(#FF6B6B, #FFE66D, #88FCA3)", // Bright gradient colors
  borderBottomLeftRadius: "60%",
  borderTopLeftRadius: "20%",
  borderBottomRightRadius: "60%",
  borderTopRightRadius: "20%",
  duration: 7,
  filter: "blur(30px)",
  ease: "power2.out"
})
.to(".blob", {
  rotateX: "7turns",
  x: 60,
  y: 50,
  scale: 1.1,
  borderBottomLeftRadius: "50%",
  borderTopLeftRadius: "10%",
  borderBottomRightRadius: "70%",
  borderTopRightRadius: "40%",
  duration: 7,
  ease: "power2.out"
})
.to(".blob", {
  rotateY: "3turns",
  x: 10,
  y: 190,
  scale: 1.7,
  background: "conic-gradient(#FFCCDD, #FF9BF1, #9FE6A0)", // Bright gradient colors
  borderBottomLeftRadius: "60%",
  borderTopLeftRadius: "60%",
  borderBottomRightRadius: "4%",
  borderTopRightRadius: "10%",
  duration: 7,
  ease: "power2.out",
  opacity: 0.8,
  filter: "blur(22px)"
})
.to(".blob", {
  rotateZ: "2turns",
  x: -20,
  y: 150,
  scale: 1.5,
  background: "conic-gradient(#FFC947, #85D4E3, #FF6B6B)", // Bright gradient colors
  borderBottomLeftRadius: "20%",
  borderTopLeftRadius: "60%",
  borderBottomRightRadius: "20%",
  borderTopRightRadius: "70%",
  duration: 7,
  opacity: 0.6,
  ease: "power2.out",
  filter: "blur(19px)"
})
.to(".blob", {
  rotateX: "1turn",
  x: 0,
  y: 50,
  scale: 1.3,
  background: "conic-gradient(#82E0AA, #FFCCDD, #C39BD3)", // Bright gradient colors
  borderBottomLeftRadius: "59%",
  borderTopLeftRadius: "38%",
  borderBottomRightRadius: "50%",
  borderTopRightRadius: "7%",
  duration: 7,
  ease: "power2.out",
  opacity: 0.2,
  filter: "blur(10px)"
});
