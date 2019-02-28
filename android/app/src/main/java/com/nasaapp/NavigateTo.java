package com.nasaapp;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class NavigateTo extends ReactContextBaseJavaModule {


    public NavigateTo(ReactApplicationContext reactContext) {
        super(reactContext);
    }


    @ReactMethod
    public void OpenNewView() {
        Intent intent = new Intent(getCurrentActivity(), DemoActivity.class);
        getReactApplicationContext().startActivity(intent);

        System.out.println("Bulb is turn ON");
    }


    @Override
    public String getName() {
        return "NavigateTo";
    }
}
