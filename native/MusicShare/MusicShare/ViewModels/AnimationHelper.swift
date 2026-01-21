import SwiftUI

struct AnimationHelper {
    static let buttonPress = Animation.easeInOut(duration: 0.1)
    static let cardAppear = Animation.easeOut(duration: 0.3)
    static let modalTransition = Animation.spring(response: 0.4, dampingFraction: 0.8)
    static let successAnimation = Animation.spring(response: 0.6, dampingFraction: 0.7)
    static let loadingRotation = Animation.linear(duration: 1).repeatForever(autoreverses: false)
}

struct ScalePressStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .animation(AnimationHelper.buttonPress, value: configuration.isPressed)
    }
}

struct FadeInView<Content: View>: View {
    let delay: Double
    let content: () -> Content
    @State private var opacity = 0.0
    @State private var scale = 0.9
    
    init(delay: Double = 0.0, @ViewBuilder content: @escaping () -> Content) {
        self.delay = delay
        self.content = content
    }
    
    var body: some View {
        content()
            .opacity(opacity)
            .scaleEffect(scale)
            .onAppear {
                withAnimation(AnimationHelper.cardAppear.delay(delay)) {
                    opacity = 1.0
                    scale = 1.0
                }
            }
    }
}