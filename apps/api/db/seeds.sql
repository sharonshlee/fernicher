INSERT INTO users (firstName, lastName, email, password)
VALUES
('Mark', 'Lae', 'marklae@gmail.com', 'marklae'),
('Jane', 'Smith', 'lewisforbusiness@gmail.com', 'janesmith'),
('Sara', 'Singh', 'sarasingh@gmail.com', 'sarasingh'),
('Claire', 'Woo', 'clairewoo@gmail.com', 'clairewoo'),
('Jerry', 'Ricco', 'jerryricco@gmail.com', 'jerryricco'),
('Lewis', 'Lee', 'lewis23@gmail.com', 'Iamkira1');

INSERT INTO categories (name, code, description)
VALUES
('Bedroom', 'bedroom', '3 wolf moon lyft food truck asymmetrical, flannel paleo kombucha chia hashtag four dollar toast master cleanse franzen. Glossier chillwave truffaut keffiyeh flannel before they sold out.'),
('Dining Room', 'dining', '8/10 condiiton. Has small dents in the corners. Pickup only. Message me if you have any questions.'),
('Kitchen', 'kitchen', 'Pickup only. Thanks!'),
('Living Room', 'living', 'Can deliver to anywhere in the GTA!'),
('Office', 'office', 'If you are looking for equipment for your home office, look no further!');

INSERT INTO products (name, description, image, categoryId, userId, productLocation, location, condition, color, createdAt)
VALUES
('Dining Table',
  'Located in the heart of downtown Toronto. Message me to arrange a pickup!',
  'https://images.unsplash.com/photo-1581404501824-b69dfb89f64c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80',
  2,
        1,
        ARRAY [43.865822, -79.61982],
        'Toronto, ON, Canada',
        'like new',
        'brown',
        '2021-11-07 18:16:40.708'
),
('Dining Chair',
              'Great condition - a classic piece. Looking to trade for a coffee table if possible!',
                  'https://images.unsplash.com/photo-1487015307662-6ce6210680f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80',
         2,
         2,
         ARRAY [43.889975, -79.560215],
         'Toronto, ON, Canada',
         'good',
         'brown',
         '2021-11-07 18:16:40.708'
),
(
    'Sofa',
    'Purchased from Ikea in 2017. 7/10 condition. Thanks!',
    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
    4,
    2,
    ARRAY [43.689975, -79.390215],
    'Toronto, ON, Canada',
    'good',
    'yellow',
    '2021-11-07 18:16:40.708'
),
(
    'Bed',
    'Sturdy frame and spring mattress. Pickup only. Message me for more details.',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
    1,
    3,
    ARRAY [43.189975, -79.890215],
    'Toronto, ON, Canada',
    'fair',
    'white',
    '2021-11-07 18:16:40.708'
),
(
    'Bed Frame',

    'Sturdy frame and spring mattress. Pickup only. Message me for more details.',

    'https://images.unsplash.com/photo-1586105251261-72a756497a11?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVkcm9vbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    1,
    3,
    ARRAY [43.089975, -79.880215],
    'Toronto, ON, Canada',
    'good',
    'grey',
    '2021-11-07 18:16:40.708'
),

(
    'White Bed Frame',

    'Sturdy frame and spring mattress. Pickup only. Message me for more details.',

    'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGJlZHJvb218ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    1,
    3,
    ARRAY [42.189975, -78.890215],
    'Toronto, ON, Canada',
    'likenew',
    'white',
    '2021-11-07 18:16:40.708'
),
(
    'Wooden Bed Frame',

    'Sturdy wooden frame and spring mattress. Pickup only. Message me for more details.',

    'https://images.unsplash.com/photo-1561049933-c8fbef47b329?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGJlZHJvb218ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    1,
    3,
    ARRAY [45.189975, -79.990215],
    'Toronto, ON, Canada',
    'likenew',
    'brown',
    '2021-11-07 18:16:40.708'
),

(
    'Dresser',
    'Xtra Large dresser in great condition.',

    'https://images.unsplash.com/photo-1609799545166-347a5ba518cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    1,
    3,
    ARRAY [42.889975, -77.590215],
    'Toronto, ON, Canada',
    'like new',
    'black',
    '2021-11-07 18:16:40.708'
),

(
    'Floor Lamp',
    '5 foot tall floor lamp. Great for any room.',
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    4,
    3,
    ARRAY [43.829975, -79.590515],
    'Toronto, ON, Canada',
    'like new',
    'silver',
    '2021-11-07 18:16:40.708'
),

(
    'Arm Chair',
    'Full arm chair. Pickup only.',
    'https://images.unsplash.com/photo-1582901109033-8aad6fed8168?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80',
    4,
    1,
    ARRAY [43.889945, -79.580215],
    'Toronto, ON, Canada',
    'like new',
    'brown',
    '2021-11-07 18:16:40.708'
),

(
    'Mirror',
    'Full sized mirror - check yourself out in full length!',

    'https://images.unsplash.com/photo-1556784344-ad913c73cfc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80',
    4,
    1,
    ARRAY [43.189975, -79.190215],
    'Toronto, ON, Canada',
    'like new',
    'silver',
    '2021-11-07 18:16:40.708'
),

(
    'Coffee Table',

    'Purchased in 2018 from Ikea. In great condition. Pickup only. Thank you!',

    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    4,
    4,
    ARRAY [44.389975, -77.523215],
    'Toronto, ON, Canada',
    'like new',
    'brown',
    '2021-11-07 18:16:40.708'
),
(
    'Rug',

    'Purchased from Ikea only 4 months ago. Basically in new condition. Message me for details!',

    'https://images.unsplash.com/photo-1556597249-cd6a997737df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=744&q=80',
    4,
    4,
    ARRAY [43.119975, -79.230215],
    'Toronto, ON, Canada',
    'like new',
    'white',
    '2021-11-07 18:16:40.708'
),
(
    'Small dining table',
    'Purchased few months ago. Message me for details!',

    'https://images.unsplash.com/photo-1564383424695-05a0668266ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=941&q=80',
    3,
    2,
    ARRAY [43.118875, -80.230215],
    'Toronto, ON, Canada',
    'fair',
    'brown',
    '2021-11-07 18:16:40.708'
),
(
    'White kitchen shelf',
    'Moving soon, letting this go, message me for details!',

    'https://images.unsplash.com/photo-1504977402025-84285fea814b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
    3,
    4,
    ARRAY [40.118875, -89.230215],
    'Toronto, ON, Canada',
    'fair',
    'white',
    '2021-11-07 18:16:40.708'
),
(
    'Wooden Dining Set',
    'Moving soon, letting this go, message me for details!',

    'https://images.unsplash.com/photo-1628797285815-453c1d0d21e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80',
    3,
    4,
    ARRAY [43.118875, -79.230215],
    'Toronto, ON, Canada',
    'good',
    'brown',
    '2021-11-07 18:16:40.708'
),
(
    'Black stool',
    'Moving soon, letting this go, message me for details!',

    'https://images.unsplash.com/photo-1571624436174-10278fda2531?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=772&q=80',
    3,
    4,
    ARRAY [43.128875, -79.230215],
    'Toronto, ON, Canada',
    'good',
    'black',
    '2021-11-07 18:16:40.708'
),
(
    'Stool',
    'Moving soon, letting this go, message me for details!',

    'https://images.unsplash.com/photo-1601719817866-8678c3d417e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1035&q=80',
    3,
    4,
    ARRAY [43.118875, -79.230215],
    'Toronto, ON, Canada',
    'good',
    'grey',
    '2021-11-07 18:16:40.708'
),
(
    'Wooden Stool',
    'Moving soon, letting this go, message me for details!',

    'https://images.unsplash.com/photo-1628304433247-804066a9864c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    3,
    4,
    ARRAY [43.218875, -79.230215],
    'Toronto, ON, Canada',
    'good',
    'brown',
    '2021-11-07 18:16:40.708'
),
(
    'Work table',

    'Upgrading to new table, letting this go, message me for details!',

    'https://images.unsplash.com/photo-1542546068979-b6affb46ea8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    5,
    1,
    ARRAY [42.118875, -79.401415],
    'Toronto, ON, Canada',
    'likenew',
    'white',
    '2021-11-07 18:16:40.708'
),
(
    'Small computer table',

    'Finishing my term soon, letting this go, message me for details!',

    'https://images.unsplash.com/photo-1621570361070-896021ba01cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    5,
    1,
    ARRAY [46.118775, -79.051415],
    'Toronto, ON, Canada',
    'fair',
    'brown',
    '2021-11-07 18:16:40.708'
),
(
    'Swirling chair',
    'Letting this go, pm me for details',

    'https://images.unsplash.com/photo-1596485206311-2da5fafb3606?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
    5,
    4,
    ARRAY [45.018775, -79.231415],
    'Toronto, ON, Canada',
    'fair',
    'black',
    '2021-11-07 18:16:40.708'
),
(
    'Nice chair and table',
    'Moving soon! Let me know if youre interested',
    'https://images.unsplash.com/photo-1605543667606-52b0f1ee1b72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
    5,
    3,
    ARRAY [43.118675, -81.231415],
    'Toronto, ON, Canada',
    'new',
    'white',
    '2021-11-07 18:16:40.708'
),
(
    'Bar stool',

    'Purchased from Ikea only 1 months ago. Basically in new condition. Message me for details!',

    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    3,
    2,
    ARRAY [41.119975, -75.230215],
    'Toronto, ON, Canada',
    'like new',
    'brown',
    '2021-11-07 18:16:40.708'
);

INSERT INTO favourites (userId, productId)
VALUES
(
         1,
         1
      ),
      (
         1,
         2
      ),
      (
         2,
         1
      ),
      (
         2,
         2
      ),
      (
         2,
         3
      ),
      (
         2,
         4
      ),
      (
         3,
         2
      ),
      (
         3,
         3
      ),
      (
         5,
         23
      );



INSERT INTO comments (userId, productId, comment, createdAt)
VALUES
(1,  3, 'This is nice!', '2021-11-07 18:16:40.708' );
