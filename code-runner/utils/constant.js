exports.returnScript = (language, filePath) => {
    let prefix;
    switch(language){
        case 'c':
            prefix = 'gcc'
            break;
        case 'c++':
            prefix = 'gcc'
            break;
        case 'js':
            prefix = 'node'
            break;
        case 'python':
            prefix = 'python3'
            break;
        case 'java':
            prefix = 'java'
            break;
        default :
            return new Error('Invalid language');
    }
    return [ prefix, filePath ];
}

exports.returnFileName = (language) => {
    let extension;
    switch(language){
        case 'c':
            extension = 'c'
            break;
        case 'c++':
            extension = 'cpp'
            break;
        case 'js':
            extension = 'js'
            break;
        case 'python':
            extension = 'py'
            break;
        case 'java':
            extension = 'java'
            break;
        default :
            return new Error('Invalid language');
    }
    return `uploads/${Date.now()}.${extension}`;
}

