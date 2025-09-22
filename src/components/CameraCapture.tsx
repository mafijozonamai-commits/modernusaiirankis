import { useState, useRef, useCallback } from "react";
import { Camera, RotateCcw, Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CameraCaptureProps {
  onImageCapture: (imageUrl: string) => void;
  captured: boolean;
}

const CameraCapture = ({ onImageCapture, captured }: CameraCaptureProps) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to canvas
    context.drawImage(video, 0, 0);

    // Convert to data URL
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageDataUrl);
    stopCamera();
  }, [stopCamera]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  const confirmPhoto = useCallback(() => {
    if (capturedImage) {
      onImageCapture(capturedImage);
    }
  }, [capturedImage, onImageCapture]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCapturedImage(result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  if (captured) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-center">
          <Camera className="w-5 h-5" />
          Your Avatar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative bg-muted rounded-lg overflow-hidden aspect-square">
          {capturedImage ? (
            <img 
              src={capturedImage} 
              alt="Captured" 
              className="w-full h-full object-cover"
            />
          ) : isStreaming ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Camera className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Ready to capture</p>
              </div>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="flex gap-2">
          {!isStreaming && !capturedImage && (
            <>
              <Button 
                onClick={startCamera}
                className="flex-1 bg-gradient-primary hover:bg-gradient-learning transition-smooth"
              >
                <Camera className="w-4 h-4 mr-2" />
                Start Camera
              </Button>
              <Button 
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </>
          )}

          {isStreaming && !capturedImage && (
            <Button 
              onClick={capturePhoto}
              className="w-full bg-gradient-primary hover:bg-gradient-learning transition-smooth"
            >
              <Camera className="w-4 h-4 mr-2" />
              Capture Photo
            </Button>
          )}

          {capturedImage && (
            <>
              <Button 
                variant="outline"
                onClick={retakePhoto}
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake
              </Button>
              <Button 
                onClick={confirmPhoto}
                className="flex-1 bg-gradient-primary hover:bg-gradient-learning transition-smooth"
              >
                <Check className="w-4 h-4 mr-2" />
                Confirm
              </Button>
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
};

export default CameraCapture;