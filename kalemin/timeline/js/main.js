jQuery(document).ready(function($){

  var ages = [
    {
      title: "Age of Dawn",
      description: "Little is known about the Age of Dawn with any degree of certainty. The intelligent races of Kalemin had not yet developed written language, so most of the history from this period comes from the oral tradition of the church of Illdar. The information herein is dogmatic and should be thus considered with a skeptical mind.",
      blocks: [
        {
          title: 'Kalemiel creates The Mantle',
          content: ['Kalemiel, father of the gods, was alone in the void. He poured a measure of his essence into the emptiness and from it formed The Mantle, the place in which the planes reside.'],
          type: 'religious-event',
          date: 'Date unknown'
        },
        {
          title: 'Kalemiel creates the gods',
          content: [
            'Having made a place in which things could exist, Kalemiel found himself lonely. Giving up more of his essence, he created others like himself. To each, he bestowed a small part of his vast intellect and personality.',
            'After spending some time simply enjoying the company of his children, he taught them to create new things of their own.'
          ],
          type: 'religious-event',
          date: 'Date unknown'
        },
        {
          title: 'First planes are formed',
          type: 'religious-event',
          date: 'Date unknown',
          content: [
            'As any child will do when given new blocks with which to build, the children of Kalemiel set forth making realms of their own, each to his or her own taste. Due to the youth and inexperience of the creators, these planes were simplistic and largely empty.',
            'Kalemiel let his children play for a time.'
          ]
        },
        {
          title: 'Planes are refined',
          type: 'religious-event',
          date: 'Date unknown',
          content: [
            'The father of the gods worked with each of his children, helping them discover what form they wanted their realm to have. Under the father\'s guidance, each shaped their plane to fit his or her core values and desires.',
            'Kalemiel watched his children work for a time.'
          ]
        },
        {
          title: 'Cooperation and discord are born',
          type: 'religious-event',
          date: 'Date unknown',
          content: [
            'Kalemiel was impressed with the progress his children had made, and marvelled at their creations. Individually, they were becoming skilled at the art of creation.',
            'However, he had formed them from pieces of himself, and so wished to see what they could make as a whole. He set them to work creating a central realm in which they would all have influence and input. They labored long at the task, but problems began to develop. Some wanted to jump right in and start making. Others felt it would be best to make a comprehensive plan. Still others wanted nothing to do with the whole, and instead wished to focus their efforts on personal projects.',
            'In the end, this first attempt was a failure and was abandoned half-formed.'
          ]
        },
        {
          title: 'Kalemin is created',
          type: 'religious-event',
          date: 'Date unknown',
          content: [
            'The gods could feel Kalemiel\'s displeasure and disapointment at their bickering, as well as their failure. They came together and agreed to cooperate fully. They made compromises and chose a leader among themselves. This leader delegated tasks according to the ability of the others.',
            'They first laid out a plan. This plan was detailed in some areas, yet loose in others to satisfy the more creative and impulsive of them. Those who were more solitary were given whole areas or systems to create, while those who were more social tackled parts of the project together.',
            'The gods were far older and even moreso mature when their realm was complete. In honor of the father who had given them life, they named the world "Kalemin."'
          ]
        }
      ]
    }
  ];

  $('#ages').showTimeline({data: ages});

});
