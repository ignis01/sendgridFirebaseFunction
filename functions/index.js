const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()
const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sgMail = require('@sendgrid/mail');
const SERVICE_EMAIL = 'service@face2face.ca';
sgMail.setApiKey(SENDGRID_API_KEY);

exports.httpOrderUpdateArtistNotifyEmail = functions.https.onRequest((req, res) => {
    const data = JSON.parse(req.body);
    const msg = {
        personalizations: [
            {
                to:[
                    {
                        email:data.email,
                        name: data.artistName
                    }
                ],
                bcc:[
                    {
                        email: 'yldong@face2face.ca',
                        name: 'Site Administrator Yi Liang Dong'
                    }
                ],
                dynamic_template_data: {
                    customerName: data.customerName,
                    orderId: data.orderId,
                    artistName: data.artistName,
                    messageDetail: data.messageDetail,
                    orderLink: 'https://www.face2face.ca/viewOrder?orderId='+data.orderId
                },
            }
        ],
        template_id: 'd-50613ac427fd4882acb8865a86bdfbbf',
        from: {
            email: SERVICE_EMAIL,
        }
    }
    console.log(msg);

    sendEmail(msg, res);
})

exports.httpOrderUpdateCustomerNotifyEmail = functions.https.onRequest((req, res) => {
    const data = JSON.parse(req.body);
    const msg = {
        personalizations: [
            {
                to:[
                    {
                        email:data.email,
                        name: data.customerName
                    }
                ],
                bcc:[
                    {
                        email: 'yldong@face2face.ca',
                        name: 'Site Administrator Yi Liang Dong'
                    }
                ],
                dynamic_template_data: {
                    customerName: data.customerName,
                    orderId: data.orderId,
                    artistName: data.artistName,
                    messageDetail: data.messageDetail,
                    orderLink: 'https://www.face2face.ca/viewOrder?orderId='+data.orderId
                },
            }
        ],
        template_id: 'd-a246ddf8536d40e6a2274918ca9a3cbf',
        from: {
            email: SERVICE_EMAIL,
        }
    }
    console.log(msg);

    sendEmail(msg, res);
})

exports.httpOrderArtistAssignementEmail = functions.https.onRequest((req, res) => {
    const data = JSON.parse(req.body); //enable this line for end to end, this is due to a bug in angular http client
    //const data = req.body //enable for postman test
    const artistMsg = {
        personalizations: [
            {
                to:[
                    {
                        email:data.email,
                        name: data.artistName
                    }
                ],
                bcc:[
                    {
                        email: 'yldong@face2face.ca',
                        name: 'Site Administrator Yi Liang Dong'
                    }
                ],
                dynamic_template_data: {
                    artistName: data.artistName,
                    orderLink: 'https://www.face2face.ca/viewOrder?orderId='+data.orderId
                },
            }
        ],
        template_id: 'd-9dd7f25e59f447828d3d853dff047fe8',
        from: {
            email: SERVICE_EMAIL,
        }
    }

    console.log(artistMsg);

    sendEmail(artistMsg, res);

})

exports.httpOrderConfirmationEmail = functions.https.onRequest((req, res) => {
    const data = JSON.parse(req.body); //enable this line for end to end, this is due to a bug in angular http client
    //const data = req.body //enable this for postman testing

    console.log(data);
    const customerMsg = {
        personalizations: [
            {
                to:[
                    {
                        email: data.email,
                        name: data.displayName
                    }
                ],
                bcc:[
                    {
                        email: 'yldong@face2face.ca',
                        name: 'Site Administrator Yi Liang Dong'
                    }
                ],
                dynamic_template_data: {
                    customerName: data.displayName,
                    orderId: data.orderId,
                    orderDescription: data.orderDescription,
                    orderHeadCount: data.orderHeadCount,
                    orderMedium: data.orderMedium,
                    orderProtection: data.orderProtection,
                    orderSize: data.orderSize,
                    orderShipping: data.orderShipping,
                    orderPrice: data.orderPrice,
                    orderPaymentConf: data.orderPaymentConf,
                    orderLink: 'https://www.face2face.ca/viewOrder?orderId='+data.orderId
                },
            }
        ],
        template_id: 'd-5b72e41e5c7e45ac9e7a481282c377f8',
        from: {
            email: SERVICE_EMAIL,
        }
    }

    console.log(customerMsg);

    sendEmail(customerMsg, res);

})

exports.httpOrderArrivalEmail = functions.https.onRequest((req, res) => {
    const data = JSON.parse(req.body); //enable this line for end to end, this is due to a bug in angular http client
    //const data = req.body //enable this for Postman testing
    const serviceMsg = {
        personalizations: [
            {
                to:[
                    {
                        email: SERVICE_EMAIL,
                        name: data.displayName
                    }
                ],
                bcc:[
                    {
                        email: 'yldong@face2face.ca',
                        name: 'Site Administrator Yi Liang Dong'
                    }
                ],
                dynamic_template_data: {
                    orderLink: 'https://www.face2face.ca/viewOrder?orderId='+data.orderId
                },
            }
        ],
        template_id: 'd-a8eaa035cdcf466fb564e302298df53e',
        from: {
            email: SERVICE_EMAIL,
        }
    }

    console.log(serviceMsg);

    sendEmail(serviceMsg, res);

})



exports.httpContactUsEmail = functions.https.onRequest((req, res) => {
    const data = JSON.parse(req.body);
    console.log('email ' + data.senderEmail );
    console.log('name ' + data.senderName );
    console.log('topic ' + data.topic );
    console.log('message ' + data.messageDetail );

    const msg = {
            personalizations: [
                {
                    to: [
                        {
                            email: SERVICE_EMAIL,
                            name: "Face2Face Customer Care"
                        }
                    ],
                    cc: [
                        {
                            email: 'yldong@face2face.ca',
                            name: 'Site Administrator Yi Liang Dong'
                        }
                    ],
                    subject: "Customer Inquiry - " + data.topic
                    // dynamic_template_data: {
                    //     custName: data.senderName,
                    //     custEmail: data.senderEmail,
                    //     custTopic: data.topic,
                    //     custMsg: data.messageDetail
                    // }
                }
            ],
            from: {
                email: 'service@face2face.ca',
                name: data.senderName
            },
            reply_to: {
                email: data.senderEmail,
                name: data.senderName
            },
            //template_id: "d-5ca36ba4ab9441b1b6c147541749c1c0"
            content: [
                {
                    type: "text/plain",
                    value: data.messageDetail
                },
                {
                    type: "text/html",
                    value: "<div>Customer - " +data.senderName + " - " +  data.senderEmail+ "</div>" +
                        "   <div><h3>" + data.topic + "</h3></div><div><p>" + data.messageDetail + "</p></div>"
                }

            ]
        }
        console.log(msg);

        sendEmail(msg, res);
    })


exports.httpWelcomeEmail = functions.https.onRequest((req, res) => {
    console.log(req.body);
    const data = JSON.parse(req.body);
    console.log(data);
    //const data = req.body;
    console.log('email '+ data.email);
    console.log('name' + data.displayName);
    const msg = {
        personalizations: [
            {
                to: [
                    {
                        email: data.email,
                        name: data.displayName
                    }
                ],

                dynamic_template_data: {
                    displayName: data.displayName
                },
                subject: 'Welcome to face2face.ca!'

            }
        ],
        template_id: 'd-bbb91c01d1c24e09be0ff937b773632c',
        from: {
            email: SERVICE_EMAIL,
        },
        reply_to: {
            email: SERVICE_EMAIL,
        },

       /* content: [
            {
                type: "text/plain",
                value: "Hi "+ data.displayName + "\n" + ""
            },
            {
                type: "text/html",
                value: "<div><h3>Hi " +  data.displayName + "</h3></div>" +
                    "<p></p>" +
                    "<div>Thank you for registering with <a href=\"www.face2face.ca\">Face2Face.ca</a> where you can order 100% handmade portraits online. Please feel free to browse through our online <a href=\"www.face2face.ca/gallery\">galleries</a>, get to know" +
                    "our featured <a href=\"www.face2face.ca/artists\">artists</a>, and place your online portrait <a href=\"www.face2face.ca/order\">orders</a>. I hope you enjoy your visit to our site!</div>" +
                    "<br>" +
                    "<br>" +
                    "<br>" +
                    "<br>" +
                    "<br>" +
                    "<div>Sincerely Yours</div>" +
                    "<div>Yi Liang Dong</div>" +
                    "<div><a href=\"www.face2face.ca\">www.face2face.ca</a></div>"
            }

        ]*/
    }

    console.log(msg);
    sendEmail(msg, res);
})


function sendEmail(msg, res) {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    sgMail.send(msg).then(() => {
        console.log('email sent');
        return res.status(200).send(true);
    }).catch(err => {
        console.log('failed sending email' + err.message);
        return res.status(503).send(err);
    });
}