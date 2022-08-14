import setText , {appendText} from './results.mjs';

export async function get(){
    const {data} = await axios.get("http://localhost:3000/orders/1");
    setText(JSON.stringify(data));
}

export async function getCatch(){
    try{
    const {data} = await axios.get("http://localhost:3000/orders/123");
    setText(JSON.stringify(data));
    } catch (error) { 
        setText(error);
    }
}

export async function chain(){
    const {data} = await axios.get("http://localhost:3000/orders/1");
    const {data: address} = await axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`)

    setText(`City: ${JSON.stringify(address.city)}`)
}

export async function concurrent(){

}

export async function parallel(){
    setText("");

    await Promise.all([
        (async () => {
            const {data} = await axios.get("http://localhost:3000/orderStatuses");
            appendText(JSON.stringify(data))
        }) (), 
        (async () => {
            const {data} = await axios.get("http://localhost:3000/orders");
            appendText(JSON.stringify(data))
        }) (),
    ]);

}