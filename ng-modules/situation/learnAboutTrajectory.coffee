module.exports = {
    initial:{
        story: "
          <h3>Oregon Trajectory Info</h3>
          The year is 2050 and you are tasked with a mission called Oregon,
          named after the Oregon Trail of the 1800s, to go to Jupiter’s moon Europa.
          NASA scientists discovered that Europa has signs of water and organic
          molecules such as methane. They believe life is under the surface of
          Europa and you’re going to find it!
        ",
        choices: [
            {
                name: "Continue",
                next:"step2"
            }
        ]
    },
    step2: {
        story: "
          <h3>Oregon Trajectory info (cont)</h3>
          Since the discovery of the potential for life on Europa, NASA has been
          ramping up it’s capabilities to get humans out of Earth’s orbit. This
          all started in the mid 2020’s with the development of the Space Launch
          System and with NASA’s Asteroid Redirect Mission to identify, capture
          and redirect a near-Earth asteroid to a stable orbit around the moon.
        ",
        choices: [
            {
                name: "Continue",
                next:"step3"
            }
        ]
    },
    step3: {
        story: "
          <h3>Oregon Trajectory info (cont)</h3>
          The Asteroid Redirect Mission (ARM) helped develop new technologies
          and hardware to reach these near-Earth asteroids. These technologies
          also made their way to the private space industry where companies
          were interested in mining these asteroids for metals that are rare
          on Earth. This was the start of a new age where astronauts were
          regularly traveling out of Earth’s orbit.
        ",
        choices: [
            {
                name: "Continue",
                next: (gamedata) ->
                  gamedata.scope.$broadcast('switchToModule', 'main-menu')
            }
        ]
    }
}
