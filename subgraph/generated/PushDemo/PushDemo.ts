// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class MessageUpdated extends ethereum.Event {
  get params(): MessageUpdated__Params {
    return new MessageUpdated__Params(this);
  }
}

export class MessageUpdated__Params {
  _event: MessageUpdated;

  constructor(event: MessageUpdated) {
    this._event = event;
  }

  get message(): string {
    return this._event.parameters[0].value.toString();
  }
}

export class PushDemo extends ethereum.SmartContract {
  static bind(address: Address): PushDemo {
    return new PushDemo("PushDemo", address);
  }

  message(): string {
    let result = super.call("message", "message():(string)", []);

    return result[0].toString();
  }

  try_message(): ethereum.CallResult<string> {
    let result = super.tryCall("message", "message():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class SetMessageCall extends ethereum.Call {
  get inputs(): SetMessageCall__Inputs {
    return new SetMessageCall__Inputs(this);
  }

  get outputs(): SetMessageCall__Outputs {
    return new SetMessageCall__Outputs(this);
  }
}

export class SetMessageCall__Inputs {
  _call: SetMessageCall;

  constructor(call: SetMessageCall) {
    this._call = call;
  }

  get _message(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class SetMessageCall__Outputs {
  _call: SetMessageCall;

  constructor(call: SetMessageCall) {
    this._call = call;
  }
}
