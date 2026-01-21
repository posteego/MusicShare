import SwiftUI
import UIKit
import Combine

class ClipboardService: ObservableObject {
    static let shared = ClipboardService()
    
    private init() {}
    
    func copyToClipboard(_ string: String) {
        UIPasteboard.general.string = string
    }
    
    func getStringFromClipboard() -> String? {
        return UIPasteboard.general.string
    }
    
    func hasURLInClipboard() -> Bool {
        guard let clipboardString = getStringFromClipboard() else { return false }
        return validateURL(clipboardString)
    }
    
    func getURLFromClipboard() -> URL? {
        guard let clipboardString = getStringFromClipboard() else { return nil }
        return URL(string: clipboardString)
    }
    
    private func validateURL(_ url: String) -> Bool {
        guard let urlObject = URL(string: url) else { return false }
        return urlObject.scheme == "http" || urlObject.scheme == "https"
    }
}

extension View {
    func showCopyToast(message: String, isShowing: Binding<Bool>) -> some View {
        self.overlay(
            VStack {
                Spacer()
                if isShowing.wrappedValue {
                    HStack {
                        Spacer()
                        Text(message)
                            .padding()
                            .background(Color.black.opacity(0.8))
                            .foregroundColor(.white)
                            .cornerRadius(10)
                            .padding(.horizontal)
                            .transition(.move(edge: .bottom))
                            .animation(.easeInOut(duration: 0.3), value: isShowing.wrappedValue)
                        Spacer()
                    }
                    .padding(.bottom, 50)
                }
            }
            .animation(.easeInOut(duration: 0.3), value: isShowing.wrappedValue)
        )
    }
}