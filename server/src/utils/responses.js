export function notImplemented(response){
    response.status(500).json({error:"Entrypoint is not implemented"});
}

export function ok(response, result){
    response.status(200).json(result);
}

export function badRequest(response, result){
    response.status(400).json(result);
}

export default { notImplemented, ok, badRequest };
