import { IonIcon } from "@ionic/react";
import { closeCircleOutline } from 'ionicons/icons'


interface ModalBaseProps {
  icon?: string;
  title?: string;
  text?: string;
  visible: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  transparent?: boolean;
}

const ModalBase: React.FC<ModalBaseProps> = ({
  icon,
  title,
  text,
  visible,
  children,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 p-5 gap-6 rounded-2xl shadow-md bg-white">
        <div className="flex flex-wrap flex-row justify-between">
          {icon && (
            <div className="bg-pink-50 w-14 h-14 flex justify-center items-center rounded-full">
              <div className="bg-pink-100 w-10 h-10 flex justify-center items-center rounded-full">
                <IonIcon icon={icon} className="text-[#FF006F] text-xl" />
              </div>
            </div>
          )}

          <div className="m-2" onClick={onClose}>
            <IonIcon icon={closeCircleOutline} style={{ fontSize: "25px" }} className="text-gray-500" />
          </div>
        </div>

        {title && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
        )}

        {text && (
          <div className="mt-4">
            <p className="text-gray-700">{text}</p>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default ModalBase;