# NaviGate

A simple provider that blocks navigation with a full page confirmation dialog. 

> NOTE: This package relies on `react-router-dom`.

## How do I run it?

After installing the dependencies. You can run the storybook server simply by running the `yarn start` or `npm start` command.

## How do I use it?

All you need to do is wrap your application with the provider.

```tsx
<Router>
    <NaviGateProvider>
        ...application
    </NaviGateProvider>
</Router>
```

> NOTE: It's important to nest your `NaviGateProvider` under your `Router`. Otherwise, the confirmation dialog won't trigger.

Inside your application you can gain access to the provider's context using the NaviGate hook.

```tsx
const MyComponent = () => {
    const {
        confirmedNavigation,
        handleCancel,
        handleConfirm,
        openDialog,
        updateNextLocation,
        updateOpenDialog,
    } = useNaviGate();

    return <>...component</>; 
};
```

## Provider Props

| prop              | type      | default | description                                                                  |
| ----------------- | --------- | :-----: | ---------------------------------------------------------------------------- |
| blockingCondition | boolean   |    -    | Extra condition to either enable or disable blocking.                        |
| children          | ReactNode |    -    | Child nodes rendered within the provider.                                    |
| DialogProps       | object    |    -    | Properties passed down to the confirmation dialog. See _Dialog Props_ below. |
| onCancel          | function  |    -    | Callback to call _after_ the modal is closed without confirming.             |
| onConfirm         | function  |    -    | Callback to call _after_ the modal is closed upon confirmation.              |
| onNavigate        | function  |    -    | Callback to call _before_ the user is navigated.                             |

## Dialog Props

| prop                  | type      | default | description                                                                                  |
| --------------------- | --------- | :-----: | -------------------------------------------------------------------------------------------- |
| open                  | boolean   |  false  | Determines whether or not the modal is visible.                                              |
| onCancel              | function  |    -    | Callback to call once the modal is closed without confirming.                                |
| onConfirm             | function  |    -    | Callback to call once the modal is closed after confirming.                                  |
| DialogTitleProps      | object    |    -    | See the [material-ui docs](https://material-ui.com/api/dialog-title/) for available props.   |
| DialogContentProps    | object    |    -    | See the [material-ui docs](https://material-ui.com/api/dialog-content/) for available props. |
| DialogActionsProps    | object    |    -    | See the [material-ui docs](https://material-ui.com/api/dialog-actions/) for available props. |
| PaperProps            | object    |    -    | See the [material-ui docs](https://material-ui.com/api/paper/) for available props.          |
| NaviGateDialogActions | ReactNode |    -    | Node to render for the dialog's actions section.                                             |
| NaviGateDialogTitle   | ReactNode |    -    | Node to render for the dialog's title section.                                               |
| NaviGateDialogContent | ReactNode |    -    | Node to render for the dialog's content section.                                             |
