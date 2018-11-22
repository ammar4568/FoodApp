const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')(functions.config().stripe.testKey);

exports.stripeCharge = functions.firestore
    .document('payments/{orderId}')
    .onWrite(event => {
        const orderId = event.params.orderId;
        return admin.firestore().doc(`payments/${orderId}`).set({
            'test': 'complete'
        })
    })

/* exports.stripeCharge = functions.firestore
    .document('payments/{orderId}')
    .onWrite(event => {
        const payment = event.data.data()
        const orderId = event.params.orderId
        // const paymentId = event.params.paymentId

        if (!payment || payment.charge) return

        return admin.firestore()
            .doc(`payments/${orderId}`)
            .get()
            .then(snapshot => {
                return snapshot;
            })
            .then(order => {
                const amount = payment.price;
                const idempotency_key = orderId;
                const source = payment.token.id;
                const currency = 'usd';
                const charge = { amount, currency, source }

                return stripe.charges.create(charge, { idempotency_key })
            })
            .then(charge => {
                admin.firestore().doc(`payments/${orderId}`).set({
                    charge: charge
                }, { merge: true });
            })
    }) */

// exports.stripeCharge = functions.firestore.document('/payments/{orderId}')
//     .onWrite((snap, context) => {
//         // return snap.data();

//         const payment = snap.data();
//         orderId = context.params.orderId;

//         if (!payment || payment.charge) {
//             return;
//         }

//         const amount = payment.amount;
//         const idempotency_key = orderId;
//         const source = payment.token.id;
//         const currency = 'usd';
//         const charge = { amount, currency, source };

//         stripe.charges.create(charge, { idempotency_key });
//         return admin.firestore().collection('payments').doc(orderId).update()
//     });