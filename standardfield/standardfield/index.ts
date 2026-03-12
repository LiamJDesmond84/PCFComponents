import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class standardfield implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    // input field in the container (main page) (used below to create element)

    // input field on the right side of the page
    // sampleProperty

    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        // Add control initialization code
        const button: HTMLButtonElement = document.createElement("button");
        button.innerText = "Click me";
        button.addEventListener("click", () => {
            console.log('Creating Record');
            context.webAPI.createRecord("account", { name: "Globex", telephone1: "425 555 1234", websiteurl: "www.globex.com" }).then(
                function (entityId) {
                    alert("Record created with ID: " + entityId.id);
                },
                function (error) {
                    alert("Error creating record: " + error.message);    
            });
            console.log('Retrieving Multiple Records');
            
            context.webAPI.retrieveMultipleRecords("account", "?$select=name,telephone1,websiteurl").then(result => {
                console.log(result);
            });
            return null;
        })
        //     context.webAPI.retrieveRecord("account", "e0d42377-af34-ef11-840a-00224805cbd6", "?$select=name,address1_telephone2,websiteurl").then(result => {
        //         alert(result);
        //         return null;
        //     });
        // });
        container.appendChild(button);

    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Add code to update control view
        console.log("UPDATE VIEW");
        

    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {

        return {

        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary

    }
}
