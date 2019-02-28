//
//  NavigateTo.swift
//  NasaApp
//
//  Created by jagnesh chawla on 28/02/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import UIKit

@objc(NavigateTo)
class NavigateTo: NSObject {
  
  var parentVC: UIViewController?
  
  @objc
  static var isOn = false
  
  @objc
  func OpenNewView() {
    NavigateTo.isOn = true
    print("Bulb is now ON")
/*    let storyboard = UIStoryboard(name: "MainStoryboard", bundle: nil)
    let vc = self.storyboard?.instantiateViewControllerWithIdentifier("ViewController") as! ViewController
    vc.newsObj = newsObj
    present(vc!, animated: true, completion: nil)*/
    
//var parentVC: UIViewController?
    DispatchQueue.main.async {
      UIApplication.shared.keyWindow?.rootViewController?.present(ViewController(), animated: true, completion: nil)
      
    }
    
  }
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
