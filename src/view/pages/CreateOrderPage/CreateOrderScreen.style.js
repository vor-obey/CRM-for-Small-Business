export const CreateOrderScreenStyle = (theme => ({
         root: {
            marginTop: theme.spacing(3)
         },
         paper: {
            padding: theme.spacing(2)
         },
         submit: {
            margin: theme.spacing(3, 0, 2)
         },
         heading: {
            paddingBottom: 5,
            paddingTop: 5,
            textAlign: 'left'
         },
         inputPrice: {
            marginLeft: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
               marginLeft: 0
            },
         },
         inputSelect: {
            marginLeft: theme.spacing(2)
         },
         cityAutocomplete: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            paddingRight: theme.spacing(2),
            [theme.breakpoints.down('xs')]:
               {
                  paddingRight: 0
               }
            ,
         },
         warehouseAutocomplete: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            paddingLeft: theme.spacing(2),
            [theme.breakpoints.down('xs')]:
               {
                  paddingLeft: 0
               },
         },
         rootGrid: {
            marginTop: theme.spacing(3)
         },
         textCreateCustomer: {
            paddingBottom: 5,
            textAlign: 'center'
         },
         gridText: {
            marginBottom: theme.spacing(1)
         },
         gridCustomers: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            [theme.breakpoints.down('xs')]:
               {
                  marginBottom: theme.spacing(1),
                  paddingRight: theme.spacing(1),
                  paddingLeft: theme.spacing(4)
               },
         },
         inputUserName: {
            marginTop: theme.spacing(1),
            [theme.breakpoints.down('xs')]:
               {
                  paddingRight: 0
               }
         },
         inputName: {
            marginTop: theme.spacing(1),
            [theme.breakpoints.down('xs')]:
               {
                  paddingLeft: 0
               }
         },
         inputNumber: {
            marginTop: theme.spacing(1),
            [theme.breakpoints.down('xs')]:
               {
                  paddingLeft: 0
               },
         },
         gridButton: {
            marginTop: theme.spacing(3),
            paddingRight: theme.spacing(3),
            [theme.breakpoints.down('sm')]:
               {
                  paddingRight: 0,
               }
         },
         inputDetails: {
            paddingRight: theme.spacing(10)
         },
         selectSource: {
            marginTop: theme.spacing(1)
         },
         gridManager: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2)
         },
         labelInput: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
         },
         gridDetails: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
         },
         gridSource: {
            marginBottom: theme.spacing(1)
         },
      }
   ))
;
